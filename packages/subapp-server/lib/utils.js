"use strict";

// Copy from electrode-react-webapp for now

const Fs = require("fs");
const Path = require("path");

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
    return require(Path.resolve(options.bundleChunkSelector)); // eslint-disable-line
  }

  return () => ({
    css: "main",
    js: "main"
  });
}

function getIconStats(iconStatsPath) {
  let iconStats;
  try {
    iconStats = Fs.readFileSync(Path.resolve(iconStatsPath)).toString();
    iconStats = JSON.parse(iconStats);
  } catch (err) {
    return "";
  }
  if (iconStats && iconStats.html) {
    return iconStats.html.join("");
  }
  return iconStats;
}

function getCriticalCSS(path) {
  const criticalCSSPath = Path.resolve(process.cwd(), path || "");

  try {
    const criticalCSS = Fs.readFileSync(criticalCSSPath).toString();
    return criticalCSS;
  } catch (err) {
    return "";
  }
}

const updateFullTemplate = (baseDir, options) => {
  if (options.templateFile) {
    options.templateFile = Path.resolve(baseDir, options.templateFile);
  }
};

function findEnv(keys, defVal) {
  const k = [].concat(keys).find(x => x && process.env.hasOwnProperty(x));
  return k ? process.env[k] : defVal;
}

function getDefaultRouteOptions() {
  const isDevProxy = process.env.hasOwnProperty("APP_SERVER_PORT");
  const webpackDev = process.env.WEBPACK_DEV === "true";
  // temporary location to write build artifacts in dev mode
  const buildArtifacts = ".etmp";
  return {
    pageTitle: "Untitled Electrode Web Application",
    //
    webpackDev,
    isDevProxy,
    //
    devServer: {
      host: findEnv([isDevProxy && "HOST", "WEBPACK_DEV_HOST", "WEBPACK_HOST"], "127.0.0.1"),
      port: findEnv([isDevProxy && "PORT", "WEBPACK_DEV_PORT"], isDevProxy ? "3000" : "2992"),
      https: Boolean(process.env.WEBPACK_DEV_HTTPS)
    },
    //
    stats: webpackDev ? `${buildArtifacts}/stats.json` : "dist/server/stats.json",
    iconStats: "dist/server/iconstats.json",
    criticalCSS: "dist/js/critical.css",
    buildArtifacts,
    prodBundleBase: "/js/",
    devBundleBase: "/js",
    cspNonceValue: undefined,
    templateFile: Path.join(__dirname, "..", "resources", "index-page")
  };
}

module.exports = {
  resolveChunkSelector,
  getIconStats,
  getCriticalCSS,
  getDefaultRouteOptions,
  updateFullTemplate
};
