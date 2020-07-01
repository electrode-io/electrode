"use strict";

/* eslint-disable no-console, no-magic-numbers */

// Copy from electrode-react-webapp for now

const Fs = require("fs");
const Path = require("path");
const Boom = require("@hapi/boom");
const optionalRequire = require("optional-require")(require);
const getDevProxy = optionalRequire("@xarc/app-dev/config/get-dev-proxy");
const HttpStatusCodes = require("http-status-codes");

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
  const { settings = {}, devServer = {}, fullDevServer = {}, httpDevServer = {} } = getDevProxy
    ? getDevProxy()
    : {};
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
    templateFile: Path.join(__dirname, "..", "resources", "index-page"),
    cdn: {},
    reporting: { enable: false }
  };
}

function cleanStack(stack) {
  const lines = stack
    .split("\n")
    .map(x => {
      const x2 = x.trimRight();
      const cwd = process.cwd();
      if (cwd.length > 2) {
        return x2.replace(cwd, ".");
      }
      return x2;
    })
    .filter(x => {
      return !x.match(
        // drop node.js internal modules
        // drop isomorphic-loader extend-require
        // drop pirates require hooks
        /(\(internal\/modules\/)|(node_modules\/isomorphic-loader)|(node_modules\/pirates\/)/
      );
    });

  return lines.join("\n");
}

function makeErrorStackResponse(routeName, err) {
  const stack = cleanStack(err.stack);
  console.error(`Route ${routeName} failed:`, stack);
  return `<html><body><h1>DEV ERROR</h1><pre>${stack}</pre></body></html>`;
}

function errorResponse({ routeName, h, err }) {
  if (process.env.NODE_ENV !== "production") {
    return h
      .response(makeErrorStackResponse(routeName, err))
      .type("text/html; charset=UTF-8")
      .code(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  } else {
    return Boom.internal();
  }
}

module.exports = {
  resolveChunkSelector,
  getIconStats,
  getCriticalCSS,
  getDefaultRouteOptions,
  updateFullTemplate,
  errorResponse,
  makeErrorStackResponse
};
