"use strict";

const _ = require("lodash");
const Promise = require("bluebird");
const fs = require("fs");
const Path = require("path");
const RenderContext = require("./render-context");
const parseTemplate = require("./parse-template");
const customToken = require("./custom-token");
const loadHandler = require("./load-handler");
const Renderer = require("./renderer");

const HTTP_ERROR_500 = 500;

const utils = require("./utils");

const resolveChunkSelector = utils.resolveChunkSelector;
const loadAssetsFromStats = utils.loadAssetsFromStats;
const getIconStats = utils.getIconStats;
const getCriticalCSS = utils.getCriticalCSS;
const getStatsPath = utils.getStatsPath;

const resolvePath = path => (!Path.isAbsolute(path) ? Path.resolve(path) : path);

function loadTokenHandler(path, options) {
  const mod = loadHandler(path);
  return mod(options);
}

function makeRouteHandler(routeOptions, userContent) {
  const WEBPACK_DEV = routeOptions.webpackDev;
  const RENDER_JS = routeOptions.renderJS;
  const RENDER_SS = routeOptions.serverSideRendering;
  const html = fs.readFileSync(resolvePath(routeOptions.htmlFile)).toString();
  const assets = routeOptions.__internals.assets;
  const devBundleBase = routeOptions.__internals.devBundleBase;
  const prodBundleBase = routeOptions.prodBundleBase;
  const chunkSelector = routeOptions.__internals.chunkSelector;
  const iconStats = getIconStats(routeOptions.iconStats);
  const htmlTokens = parseTemplate(html);
  const criticalCSS = getCriticalCSS(routeOptions.criticalCSS);

  const routeData = {
    WEBPACK_DEV,
    RENDER_JS,
    RENDER_SS,
    html,
    assets,
    devBundleBase,
    prodBundleBase,
    chunkSelector,
    iconStats,
    criticalCSS,
    htmlTokens
  };

  const loadHandlerOptions = { routeOptions, routeData };

  const tokenHandlers = [].concat(routeOptions.tokenHandler || []);
  tokenHandlers.push(Path.join(__dirname, "default-handlers.js"));
  routeData.tokenHandlers = tokenHandlers.map(h => loadTokenHandler(h, loadHandlerOptions));
  routeData.tokenHandler = _.last(routeData.tokenHandlers);
  customToken.loadAll(htmlTokens, loadHandlerOptions);

  const renderer = new Renderer({
    htmlTokens,
    tokenHandlers: routeData.tokenHandlers
  });

  /* Create a route handler */
  /* eslint max-statements: [2, 35] */
  return options => {
    const request = options.request;
    const mode = options.mode;
    let renderSs = RENDER_SS;
    if (renderSs) {
      if (mode === "noss") {
        renderSs = false;
      } else if (mode === "datass" && request.app) {
        // signal user content callback to populate prefetch data only and skips actual SSR
        request.app.ssrPrefetchOnly = true;
      }
    }

    const renderPage = content => {
      // allow content to specifically turn off rendering index with render
      // flag set to false
      // content.html must be defined to render index
      if (content.render === false || content.html === undefined) {
        return Promise.resolve(content);
      }

      let cspScriptNonce;
      let cspStyleNonce;
      if (routeOptions.cspNonceValue !== undefined) {
        const nonceObject = routeOptions.cspNonceValue;
        if (typeof nonceObject === "function") {
          cspScriptNonce = nonceObject(request, "script");
          cspStyleNonce = nonceObject(request, "style");
        } else {
          cspScriptNonce = _.get(request, nonceObject.script, undefined);
          cspStyleNonce = _.get(request, nonceObject.style, undefined);
        }
      }

      const chunkNames = chunkSelector(request);

      let devCSSBundle;
      if (chunkNames.css) {
        const cssChunks = Array.isArray(chunkNames.css) ? chunkNames.css : [chunkNames.css];
        devCSSBundle = _.map(cssChunks, chunkName => `${devBundleBase}${chunkName}.style.css`);
      } else {
        devCSSBundle = [`${devBundleBase}style.css`];
      }

      const devJSBundle = chunkNames.js
        ? `${devBundleBase}${chunkNames.js}.bundle.dev.js`
        : `${devBundleBase}bundle.dev.js`;
      const jsChunk = _.find(assets.js, asset => _.includes(asset.chunkNames, chunkNames.js));
      const cssChunk = _.filter(assets.css, asset =>
        _.some(asset.chunkNames, assetChunkName => _.includes(chunkNames.css, assetChunkName))
      );
      const scriptNonce = cspScriptNonce ? ` nonce="${cspScriptNonce}"` : "";
      const styleNonce = cspStyleNonce ? ` nonce="${cspStyleNonce}"` : "";

      const renderJs = RENDER_JS && mode !== "nojs";

      const context = new RenderContext({
        request,
        routeOptions,
        routeData,
        content,
        data: {
          mode,
          renderJs,
          renderSs,
          scriptNonce,
          styleNonce,
          chunkNames,
          devCSSBundle,
          devJSBundle,
          jsChunk,
          cssChunk
        },
        user: {}
      });

      return renderer.render(context);
    };

    if (typeof userContent === "function") {
      if (renderSs) {
        // invoke user content as a function, which could return any content
        // as static html or generated from react's renderToString
        const x = userContent(request);
        if (x.then) {
          return x.then(renderPage).catch(err => {
            if (!err.status) err.status = HTTP_ERROR_500;
            throw err;
          });
        }
        return renderPage(x);
      } else {
        userContent = "";
      }
    }

    if (typeof userContent === "string") {
      userContent = { status: 200, html: userContent };
    }

    return renderPage(userContent);
  };
}

const setupOptions = options => {
  const pluginOptionsDefaults = {
    pageTitle: "Untitled Electrode Web Application",
    webpackDev: process.env.WEBPACK_DEV === "true",
    renderJS: true,
    serverSideRendering: true,
    htmlFile: Path.join(__dirname, "index.html"),
    devServer: {
      host: process.env.WEBPACK_HOST || "127.0.0.1",
      port: process.env.WEBPACK_DEV_PORT || "2992",
      https: Boolean(process.env.WEBPACK_DEV_HTTPS)
    },
    unbundledJS: {
      enterHead: [],
      preBundle: [],
      postBundle: []
    },
    paths: {},
    stats: "dist/server/stats.json",
    iconStats: "dist/server/iconstats.json",
    criticalCSS: "dist/js/critical.css",
    buildArtifacts: ".build",
    prodBundleBase: "/js/",
    cspNonceValue: undefined
  };

  const pluginOptions = _.defaultsDeep({}, options, pluginOptionsDefaults);
  const chunkSelector = resolveChunkSelector(pluginOptions);
  const devProtocol = process.env.WEBPACK_DEV_HTTPS ? "https://" : "http://";
  const devBundleBase = `${devProtocol}${pluginOptions.devServer.host}:${
    pluginOptions.devServer.port
  }/js/`;
  const statsPath = getStatsPath(pluginOptions.stats, pluginOptions.buildArtifacts);

  const assets = loadAssetsFromStats(statsPath);
  pluginOptions.__internals = {
    assets,
    chunkSelector,
    devBundleBase
  };

  return pluginOptions;
};

const setupPathOptions = (routeOptions, path) => {
  const options = routeOptions.paths[path];
  return _.defaults(
    { htmlFile: options.htmlFile, tokenHandler: options.tokenHandler },
    routeOptions
  );
};

const resolveContent = (content, xrequire) => {
  if (!_.isString(content) && !_.isFunction(content) && content.module) {
    const module = content.module.startsWith(".")
      ? Path.join(process.cwd(), content.module)
      : content.module;
    xrequire = xrequire || require;
    return xrequire(module);
  }

  return content;
};

module.exports = {
  setupOptions,
  setupPathOptions,
  makeRouteHandler,
  resolveContent
};
