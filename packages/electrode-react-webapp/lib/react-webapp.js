"use strict";

const _ = require("lodash");
const Promise = require("bluebird");
const fs = require("fs");
const Path = require("path");
const groupScripts = require("./group-scripts");
const stringReplaceAsync = require("string-replace-async");
const processCustomToken = require("./custom-tokens");

const TOKEN_REGEX = /{{[A-Z_~\.\/-]*}}/gi;

const CONTENT_MARKER = "{{SSR_CONTENT}}";
const HEADER_BUNDLE_MARKER = "{{WEBAPP_HEADER_BUNDLES}}";
const BODY_BUNDLE_MARKER = "{{WEBAPP_BODY_BUNDLES}}";
const TITLE_MARKER = "{{PAGE_TITLE}}";
const PREFETCH_MARKER = "{{PREFETCH_BUNDLES}}";
const META_TAGS_MARKER = "{{META_TAGS}}";
const CRITICAL_CSS_MARKER = "{{CRITICAL_CSS}}";

const HTTP_ERROR_500 = 500;

const utils = require("./utils");

const resolveChunkSelector = utils.resolveChunkSelector;
const loadAssetsFromStats = utils.loadAssetsFromStats;
const getStatsPath = utils.getStatsPath;

const resolvePath = path => (!Path.isAbsolute(path) ? Path.resolve(path) : path);

function makeRouteHandler(routeOptions, userContent) {
  const WEBPACK_DEV = routeOptions.webpackDev;
  const RENDER_JS = routeOptions.renderJS;
  const RENDER_SS = routeOptions.serverSideRendering;
  const html = fs.readFileSync(resolvePath(routeOptions.htmlFile)).toString();
  const assets = routeOptions.__internals.assets;
  const devBundleBase = routeOptions.__internals.devBundleBase;
  const prodBundleBase = routeOptions.prodBundleBase;
  const chunkSelector = routeOptions.__internals.chunkSelector;
  const replaceTokenCallback = routeOptions.replaceToken;

  /* Create a route handler */
  /* eslint max-statements: [2, 35] */
  return options => {
    const mode = options.mode;
    const renderJs = RENDER_JS && mode !== "nojs";
    let renderSs = RENDER_SS;
    if (renderSs) {
      if (mode === "noss") {
        renderSs = false;
      } else if (mode === "datass" && options.request.app) {
        options.request.app.disableSSR = true;
      }
    }

    const chunkNames = chunkSelector(options.request);
    const devCSSBundle = chunkNames.css
      ? `${devBundleBase}${chunkNames.css}.style.css`
      : `${devBundleBase}style.css`;
    const devJSBundle = chunkNames.js
      ? `${devBundleBase}${chunkNames.js}.bundle.dev.js`
      : `${devBundleBase}bundle.dev.js`;
    const jsChunk = _.find(assets.js, asset => _.includes(asset.chunkNames, chunkNames.js));
    const cssChunk = _.find(assets.css, asset => _.includes(asset.chunkNames, chunkNames.css));

    const bundleCss = () => {
      return WEBPACK_DEV ? devCSSBundle : (cssChunk && `${prodBundleBase}${cssChunk.name}`) || "";
    };

    const bundleJs = () => {
      if (!renderJs) {
        return "";
      }
      return WEBPACK_DEV ? devJSBundle : (jsChunk && `${prodBundleBase}${jsChunk.name}`) || "";
    };

    const bundleManifest = () => {
      if (!assets.manifest) {
        return "";
      }

      return WEBPACK_DEV
        ? `${devBundleBase}${assets.manifest}`
        : `${prodBundleBase}${assets.manifest}`;
    };

    const callUserContent = content => {
      const x = content(options.request);
      return !x.catch
        ? x
        : x.catch(err => {
            return Promise.reject({
              status: err.status || HTTP_ERROR_500,
              html: err.message || err.toString()
            });
          });
    };

    const htmlifyScripts = scripts => {
      return scripts
        .map(
          x =>
            typeof x === "string"
              ? `<script>${x}</script>\n`
              : x.map(n => `<script src="${n.src}"></script>`).join("\n")
        )
        .join("\n");
    };

    const makeHeaderBundles = () => {
      const manifest = bundleManifest();
      const manifestLink = manifest ? `<link rel="manifest" href="${manifest}" />\n` : "";
      const css = bundleCss();
      return utils.getCriticalCSS(routeOptions.criticalCSS).then(criticalCSS => {
        const cssLink = css && !criticalCSS ? `<link rel="stylesheet" href="${css}" />` : "";
        const htmlScripts = htmlifyScripts(
          groupScripts(routeOptions.unbundledJS.enterHead).scripts
        );
        return `${manifestLink}${cssLink}${htmlScripts}`;
      });
    };

    const makeBodyBundles = () => {
      const js = bundleJs();
      const jsLink = js ? { src: js } : "";

      const ins = routeOptions.unbundledJS.preBundle
        .concat([jsLink])
        .concat(routeOptions.unbundledJS.postBundle);
      const htmlScripts = htmlifyScripts(groupScripts(ins).scripts);

      return `${htmlScripts}`;
    };

    const renderPage = content => {
      const renderContext = {
        request: options.request,
        routeOptions,
        options,
        content
      };

      const replaceBuiltInToken = (token, getDefaultValue) => {
        let replacePromise;
        // The replaceTokenCallback is expected to return a Promise that
        // resolves to the replacement string
        if (_.isFunction(replaceTokenCallback)) {
          const replacement = replaceTokenCallback(
            utils.stripTokenDelimiters(token),
            renderContext,
            getDefaultValue
          );
          if (utils.isPromise(replacement)) {
            replacePromise = replacement;
          } else if (_.isString(replacement)) {
            replacePromise = Promise.resolve(replacement);
          } else {
            replacePromise = getDefaultValue();
          }
        } else {
          replacePromise = getDefaultValue();
        }
        return replacePromise.then(value => value || "");
      };

      const processBuiltInToken = token => {
        switch (token) {
          case CONTENT_MARKER:
            return replaceBuiltInToken(CONTENT_MARKER, () => Promise.resolve(content.html || ""));
          case TITLE_MARKER:
            return replaceBuiltInToken(TITLE_MARKER, () =>
              Promise.resolve(`<title>${routeOptions.pageTitle}</title>`)
            );
          case HEADER_BUNDLE_MARKER:
            return replaceBuiltInToken(HEADER_BUNDLE_MARKER, makeHeaderBundles);
          case BODY_BUNDLE_MARKER:
            return replaceBuiltInToken(BODY_BUNDLE_MARKER, () =>
              Promise.resolve(makeBodyBundles())
            );
          case PREFETCH_MARKER:
            return replaceBuiltInToken(PREFETCH_MARKER, () =>
              Promise.resolve(`<script>${content.prefetch}</script>`)
            );
          case META_TAGS_MARKER:
            return replaceBuiltInToken(META_TAGS_MARKER, () =>
              utils.getIconStats(routeOptions.iconStats)
            );
          case CRITICAL_CSS_MARKER:
            return replaceBuiltInToken(CRITICAL_CSS_MARKER, () =>
              utils.getCriticalCSS(routeOptions.criticalCSS)
            );
          default:
            return `Unknown token ${token}`;
        }
      };

      return stringReplaceAsync(html, TOKEN_REGEX, token => {
        if (token.startsWith("{{~")) {
          return processCustomToken(token, renderContext);
        }

        return processBuiltInToken(token);
      });
    };

    const renderSSRContent = content => {
      const p = _.isFunction(content)
        ? callUserContent(content)
        : Promise.resolve(_.isObject(content) ? content : { html: content });
      return p.then(c => renderPage(c));
    };

    return renderSSRContent(renderSs ? userContent : "");
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
    prodBundleBase: "/js/"
  };

  const pluginOptions = _.defaultsDeep({}, options, pluginOptionsDefaults);
  const chunkSelector = resolveChunkSelector(pluginOptions);
  const devProtocol = process.env.WEBPACK_DEV_HTTPS ? "https://" : "http://";
  const devBundleBase = `${devProtocol}${pluginOptions.devServer.host}:${pluginOptions.devServer
    .port}/js/`;
  const statsPath = getStatsPath(pluginOptions.stats, pluginOptions.buildArtifacts);

  return Promise.try(() => loadAssetsFromStats(statsPath)).then(assets => {
    pluginOptions.__internals = {
      assets,
      chunkSelector,
      devBundleBase
    };

    return pluginOptions;
  });
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
  makeRouteHandler,
  resolveContent
};
