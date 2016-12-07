"use strict";

const _ = require("lodash");
const Promise = require("bluebird");
const fs = require("fs");
const Path = require("path");
const assert = require("assert");


/**
 * Load stats.json which is created during build.
 * The file contains bundle files which are to be loaded on the client side.
 *
 * @param {string} statsFilePath - path of stats.json
 * @returns {Promise.<Object>} an object containing an array of file names
 */
function loadAssetsFromStats(statsFilePath) {
  return Promise.resolve(Path.resolve(statsFilePath))
    .then(require)
    .then((stats) => {
      const assets = {};
      _.each(stats.assets, (asset) => {
        const name = asset.name;
        if (name.startsWith("bundle")) {
          assets.js = name;
        } else if (name.endsWith(".css")) {
          assets.css = name;
        } else if (name.endsWith("manifest.json")) {
          assets.manifest = name;
        }
      });
      return assets;
    })
    .catch(() => ({}));
}

function getIconStats(iconStatsPath) {
  let iconStats;
  try {
    iconStats = fs.readFileSync(Path.resolve(iconStatsPath)).toString();
    iconStats = JSON.parse(iconStats);
  } catch (err) {
    return '';
  }
  if (iconStats && iconStats.html) {
    return iconStats.html.join("");
  }
  return iconStats;
}

/* eslint max-statements: [2, 16] */
function makeRouteHandler(options, userContent) {
  const CONTENT_MARKER = "{{SSR_CONTENT}}";
  const HEADER_BUNDLE_MARKER = "{{WEBAPP_HEADER_BUNDLES}}";
  const BODY_BUNDLE_MARKER = "{{WEBAPP_BODY_BUNDLES}}";
  const TITLE_MARKER = "{{PAGE_TITLE}}";
  const PREFETCH_MARKER = "{{PREFETCH_BUNDLES}}";
  const META_TAGS_MARKER = "{{META_TAGS}}";
  const WEBPACK_DEV = options.webpackDev;
  const RENDER_JS = options.renderJS;
  const RENDER_SS = options.serverSideRendering;
  const html = fs.readFileSync(Path.join(__dirname, "index.html")).toString();
  const assets = options.__internals.assets;
  const devJSBundle = options.__internals.devJSBundle;
  const devCSSBundle = options.__internals.devCSSBundle;
  const iconStats = getIconStats(options.iconStats);

  /* Create a route handler */
  /*eslint max-statements: 0*/
  return (options) => {
    const mode = options.mode;
    const renderJs = RENDER_JS && mode !== "nojs";
    const renderSs = RENDER_SS && mode !== "noss";

    const bundleCss = () => {
      return WEBPACK_DEV ? devCSSBundle : assets.css && `/js/${assets.css}` || "";
    };

    const bundleJs = () => {
      if (!renderJs) {
        return "";
      }
      return WEBPACK_DEV ? devJSBundle : assets.js && `/js/${assets.js}` || "";
    };

    const bundleManifest = () => {
      return assets.manifest ? `/js/${assets.manifest}` : "";
    };

    const callUserContent = (content) => {
      const x = content(options.request);
      return !x.catch ? Promise.resolve(x) : x.catch((err) => {
        return Promise.reject({
          status: err.status || HTTP_ERROR_500,
          html: err.message || err.toString()
        });
      });
    };

    const makeHeaderBundles = () => {
      const manifest = bundleManifest();
      const manifestLink = manifest
        ? `<link rel="manifest" href="${manifest}" />`
        : "";
      const css = bundleCss();
      const cssLink = css ? `<link rel="stylesheet" href="${css}" />` : "";
      const font = "https://fonts.googleapis.com/icon?family=Material+Icons|Open+Sans";
      const fontLink = `<link rel="stylesheet" href="${font}" />`;
      return `${manifestLink}${cssLink}${fontLink}`;
    };

    const makeBodyBundles = () => {
      const js = bundleJs();
      const jsLink = js ? `<script src="${js}"></script>` : "";
      return jsLink;
    };

    const addPrefetch = (prefetch) => {
      return prefetch ? `<script>${prefetch}</script>` : "";
    };

    const renderPage = (content) => {
      return html.replace(/{{[A-Z_]*}}/g, (m) => {
        switch (m) {
        case CONTENT_MARKER:
          return content.html || "";
        case TITLE_MARKER:
          return options.pageTitle;
        case HEADER_BUNDLE_MARKER:
          return makeHeaderBundles();
        case BODY_BUNDLE_MARKER:
          return makeBodyBundles();
        case PREFETCH_MARKER:
          return `<script>${content.prefetch}</script>`;
        case META_TAGS_MARKER:
          return iconStats;
        default:
          return `Unknown marker ${m}`;
        }
      });
    };

    const renderSSRContent = (content) => {
      const p = _.isFunction(content) ?
        callUserContent(content) :
        Promise.resolve(_.isObject(content) ? content : {html: content});
      return p.then((c) => renderPage(c));
    };

    return renderSSRContent(renderSs ? userContent : "");
  };
}

const setupOptions = (options) => {

  const pluginOptionsDefaults = {
    pageTitle: "Untitled Electrode Web Application",
    webpackDev: process.env.WEBPACK_DEV === "true",
    renderJS: true,
    serverSideRendering: true,
    devServer: {
      host: "127.0.0.1",
      port: process.env.WEBPACK_DEV_PORT || "2992"
    },
    paths: {},
    stats: "dist/server/stats.json",
    iconStats: "dist/server/iconstats.json"
  };

  const pluginOptions = _.defaultsDeep({}, options, pluginOptionsDefaults);

  return Promise.try(() => loadAssetsFromStats(pluginOptions.stats))
    .then((assets) => {
      const devServer = pluginOptions.devServer;
      pluginOptions.__internals = {
        assets,
        devJSBundle: `http://${devServer.host}:${devServer.port}/js/bundle.dev.js`,
        devCSSBundle: `http://${devServer.host}:${devServer.port}/js/style.css`
      };
      return pluginOptions;
    });
};


const resolveContent = (content) => {
  if (!_.isString(content) && !_.isFunction(content) && content.module) {
    const module = content.module.startsWith(".") ? Path.join(process.cwd(), content.module) : content.module; // eslint-disable-line
    return require(module); // eslint-disable-line
  }

  return content;
};


module.exports = {
  setupOptions,
  makeRouteHandler,
  resolveContent
};
