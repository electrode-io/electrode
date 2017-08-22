"use strict";

const _ = require("lodash");
const Promise = require("bluebird");
const fs = require("fs");
const Path = require("path");
const Helmet = require("react-helmet").Helmet;
const RenderContext = require("./render-context");
const parseTemplate = require("./parse-template");
const customToken = require("./custom-token");
const loadHandler = require("./load-handler");

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
    htmlTokens
  };

  const loadHandlerOptions = { routeOptions, routeData };

  if (routeOptions.tokenHandler) {
    routeData.userTokenHandler = loadTokenHandler(routeOptions.tokenHandler, loadHandlerOptions);
  }

  routeData.tokenHandler = loadTokenHandler(
    Path.join(__dirname, "default-handlers.js"),
    loadHandlerOptions
  );

  customToken.loadAll(htmlTokens, loadHandlerOptions);

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
      if (typeof routeOptions.cspNonceValue === "function") {
        cspScriptNonce = routeOptions.cspNonceValue(request, "script");
        cspStyleNonce = routeOptions.cspNonceValue(request, "style");
      } else {
        const nonceObject = routeOptions.cspNonceValue || {};
        cspScriptNonce = _.get(request, nonceObject.script, undefined);
        cspStyleNonce = _.get(request, nonceObject.style, undefined);
      }

      const criticalCSS = getCriticalCSS(routeOptions.criticalCSS, cspStyleNonce);

      const chunkNames = chunkSelector(request);
      const devCSSBundle = chunkNames.css
        ? `${devBundleBase}${chunkNames.css}.style.css`
        : `${devBundleBase}style.css`;
      const devJSBundle = chunkNames.js
        ? `${devBundleBase}${chunkNames.js}.bundle.dev.js`
        : `${devBundleBase}bundle.dev.js`;
      const jsChunk = _.find(assets.js, asset => _.includes(asset.chunkNames, chunkNames.js));
      const cssChunk = _.find(assets.css, asset => _.includes(asset.chunkNames, chunkNames.css));
      const paddedNonce = cspScriptNonce ? ` nonce="${cspScriptNonce}"` : "";

      const helmet = Helmet.renderStatic();
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
          helmet,
          paddedNonce,
          criticalCSS,
          chunkNames,
          devCSSBundle,
          devJSBundle,
          jsChunk,
          cssChunk
        },
        user: {}
      });

      return context.render();
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
  const devBundleBase = `${devProtocol}${pluginOptions.devServer.host}:${pluginOptions.devServer
    .port}/js/`;
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
