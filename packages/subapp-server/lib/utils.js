"use strict";

// Copy from electrode-react-webapp for now

const Fs = require("fs");
const Path = require("path");
const optionalRequire = require("optional-require")(require);
const {
  settings = {},
  devServer = {},
  fullDevServer = {},
  httpDevServer = {}
} = optionalRequire("@xarc/app-dev/config/dev-proxy", { default: {} });

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

function getDefaultRouteOptions() {
  const { webpackDev, useDevProxy } = settings;
  // temporary location to write build artifacts in dev mode
  const buildArtifacts = ".etmp";
  return {
    pageTitle: "Untitled Electrode Web Application",
    webpackDev,
    useDevProxy,
    devServer,
    fullDevServer,
    httpDevServer,
    stats: webpackDev ? `${buildArtifacts}/stats.json` : "dist/server/stats.json",
    iconStats: "dist/server/iconstats.json",
    criticalCSS: "dist/js/critical.css",
    buildArtifacts,
    prodBundleBase: "/js",
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
