"use strict";

const _ = require("lodash");
const Promise = require("bluebird");
const fs = require("fs");
const Path = require("path");
const assert = require("assert");

const HTTP_ERROR_500 = 500;
const HTTP_REDIRECT = 302;

const CONTENT_MARKER = "{{SSR_CONTENT}}";
const HEADER_BUNDLE_MARKER = "{{WEBAPP_HEADER_BUNDLES}}";
const BODY_BUNDLE_MARKER = "{{WEBAPP_BODY_BUNDLES}}";
const TITLE_MARKER = "{{PAGE_TITLE}}";
const PREFETCH_MARKER = "{{PREFETCH_BUNDLES}}";
const META_TAGS_MARKER = "{{META_TAGS}}";
const CRITICAL_CSS_MARKER = "{{CRITICAL_CSS}}";

/**
 * Tries to import bundle chunk selector function if the corresponding option is set in the
 * webapp plugin configuration. The function takes a `request` object as an argument and
 * returns the chunk name.
 *
 * @param {Object} options - webapp plugin configuration options
 * @return {Function} function that selects the bundle based on the request object
 */
function resolveChunkSelector(options) {
  if (options.bundleChunkSelector) {
    return require(Path.join(process.cwd(), options.bundleChunkSelector));  // eslint-disable-line
  }

  return () => ({
    css: "",
    js: ""
  });
}

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
      const manifestAsset = _.find(stats.assets, (asset) => {
        return asset.name.endsWith("manifest.json");
      });
      const jsAssets = stats.assets.filter((asset) => {
        return asset.name.endsWith(".js");
      });
      const cssAssets = stats.assets.filter((asset) => {
        return asset.name.endsWith(".css");
      });

      if (manifestAsset) {
        assets.manifest = manifestAsset.name;
      }

      assets.js = jsAssets;
      assets.css = cssAssets;

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
    // noop
  }
  if (iconStats && iconStats.html) {
    return iconStats.html.join("");
  }
  return iconStats || "";
}

function getCriticalCSS(path) {
  const criticalCSSPath = Path.resolve(process.cwd(), path);
  try {
    const criticalCSS = fs.readFileSync(criticalCSSPath).toString();
    return `<style>${criticalCSS}</style>`;
  } catch (err) {
    return "";
  }
}

function makeRouteHandler(options, userContent) {
  const WEBPACK_DEV = options.webpackDev;
  const RENDER_JS = options.renderJS;
  const RENDER_SS = options.serverSideRendering;
  const html = fs.readFileSync(options.htmlFile).toString();
  const assets = options.__internals.assets;
  const devBundleBase = options.__internals.devBundleBase;
  const chunkSelector = options.__internals.chunkSelector;
  const iconStats = getIconStats(options.iconStats);
  const criticalCSS = getCriticalCSS(options.criticalCSS);

  /* Create a route handler */
  /* eslint max-statements: [2, 20] */
  return (request, reply) => {
    const mode = request.query.__mode || "";
    const disableSsrFlag = request.server.app && request.server.app.disableSSR;
    const renderJs = RENDER_JS && mode !== "nojs";
    const renderSs = RENDER_SS && mode !== "noss" && !disableSsrFlag;
    const chunkNames = chunkSelector(request);
    const devCSSBundle = chunkNames.css ?
      `${devBundleBase}${chunkNames.css}.style.css` :
      `${devBundleBase}style.css`;
    const devJSBundle = chunkNames.js ?
      `${devBundleBase}${chunkNames.js}.bundle.dev.js` :
      `${devBundleBase}bundle.dev.js`;
    const jsChunk = _.find(
      assets.js,
      (asset) => asset.chunkNames[0] === (chunkNames.js || "bundle")
    );
    const cssChunk = _.find(
      assets.css,
      (asset) => asset.chunkNames[0] === (chunkNames.css || "bundle")
    );

    const bundleCss = () => {
      return WEBPACK_DEV ? devCSSBundle : cssChunk && `/js/${cssChunk.name}` || "";
    };

    const bundleJs = () => {
      if (!renderJs) {
        return "";
      }
      return WEBPACK_DEV ? devJSBundle : jsChunk && `/js/${jsChunk.name}` || "";
    };

    const bundleManifest = () => {
      return assets.manifest ? `/js/${assets.manifest}` : "";
    };

    const callUserContent = (content) => {
      const x = content(request);
      return !x.catch ? x : x.catch((err) => {
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
      const cssLink = css && !criticalCSS
        ? `<link rel="stylesheet" href="${css}" />`
        : "";
      return `${manifestLink}${cssLink}`;
    };

    const makeBodyBundles = () => {
      const js = bundleJs();
      const css = bundleCss();
      const cssLink = css && criticalCSS
      ? `<link rel="stylesheet" href="${css}" />`
      : "";
      const jsLink = js ? `<script src="${js}"></script>` : "";
      return `${cssLink}${jsLink}`;
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
        case CRITICAL_CSS_MARKER:
          return criticalCSS;
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

    const handleStatus = (data) => {
      const status = data.status;
      if (status === HTTP_REDIRECT) {
        reply.redirect(data.path);
      } else {
        reply({message: "error"}).code(status);
      }
    };

    const doRender = () => {
      return renderSs ? renderSSRContent(userContent) : renderPage("");
    };

    Promise.try(doRender)
      .then((data) => {
        return data.status ? handleStatus(data) : reply(data);
      })
      .catch((err) => {
        reply(err.html).code(err.status || HTTP_ERROR_500);
      });
  };
}

const registerRoutes = (server, options, next) => {

  const pluginOptionsDefaults = {
    pageTitle: "Untitled Electrode Web Application",
    webpackDev: process.env.WEBPACK_DEV === "true",
    renderJS: true,
    serverSideRendering: true,
    htmlFile: Path.join(__dirname, "index.html"),
    devServer: {
      host: "127.0.0.1",
      port: "2992"
    },
    paths: {},
    stats: "dist/server/stats.json",
    iconStats: "dist/server/iconstats.json",
    criticalCSS: "dist/js/critical.css"
  };

  const resolveContent = (content) => {
    if (!_.isString(content) && !_.isFunction(content) && content.module) {
      const module = content.module.startsWith(".") ? Path.join(process.cwd(), content.module) : content.module; // eslint-disable-line
      return require(module); // eslint-disable-line
    }

    return content;
  };

  const pluginOptions = _.defaultsDeep({}, options, pluginOptionsDefaults);
  const chunkSelector = resolveChunkSelector(pluginOptions);
  const devBundleBase = `http://${pluginOptions.devServer.host}:${pluginOptions.devServer.port}/js/`;

  return Promise.try(() => loadAssetsFromStats(pluginOptions.stats))
    .then((assets) => {
      pluginOptions.__internals = {
        assets,
        chunkSelector,
        devBundleBase
      };

      _.each(options.paths, (v, path) => {
        assert(v.content, `You must define content for the webapp plugin path ${path}`);
        server.route({
          method: "GET",
          path,
          config: v.config || {},
          handler: makeRouteHandler(pluginOptions, resolveContent(v.content))
        });
      });
      next();
    })
    .catch(next);
};

registerRoutes.attributes = {
  pkg: {
    name: "webapp",
    version: "1.0.0"
  }
};

module.exports = registerRoutes;
