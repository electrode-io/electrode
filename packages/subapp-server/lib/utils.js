"use strict";

/* eslint-disable no-console, no-magic-numbers */

const assert = require("assert");
const _ = require("lodash");
const Path = require("path");
const Boom = require("@hapi/boom");
const Crypto = require("crypto");
const optionalRequire = require("optional-require")(require);
const getDevProxy = optionalRequire("@xarc/app-dev/config/get-dev-proxy");
const HttpStatusCodes = require("http-status-codes");
const {
  utils: { loadFuncFromModule }
} = require("@xarc/index-page");

const NONCE_SIZE = 16;

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
    // pass a nonce value frmo app, electrode will set csp header using this nonce
    cspNonceValue: undefined, 
    // if `true`, electrode will generate nonce and add CSP header
    // A function that returns nonce can be passed as well
    cspHeader: false, // boolean || function
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

const checkSSRMetricsReporting = _.once(topOpts => {
  const reporting = _.get(topOpts, "reporting", {});
  if (!reporting.enable || !reporting.reporter) {
    // eslint-disable-next-line
    console.log(
      `INFO: subapp-server disabled SSR metrics. options.report: ${JSON.stringify(reporting)}`
    );
  }
});

/**
 * invoke user specified custom template processing hook
 *
 * @param {*} asyncTemplate - the template container
 * @param {*} routeOptions - route options
 *
 * @returns {*} - result from the processing hook
 */
function invokeTemplateProcessor(asyncTemplate, routeOptions) {
  const tp = routeOptions.templateProcessor;

  if (tp) {
    let tpFunc;
    if (typeof tp === "string") {
      tpFunc = loadFuncFromModule(tp, "templateProcessor");
    } else {
      tpFunc = tp;
      assert(typeof tpFunc === "function", `templateProcessor is not a function`);
    }

    return tpFunc(asyncTemplate, routeOptions);
  }

  return undefined;
}

function getSrcDir(pluginOpts) {
  return (
    pluginOpts.srcDir ||
    process.env.APP_SRC_DIR ||
    (process.env.NODE_ENV === "production" ? "lib" : "src")
  );
}

function nonceGenerator(_) {
  const token = Crypto.randomBytes(NONCE_SIZE).toString("base64");
  return token.substring(0, token.length - 1);
}

/**
 * Sets CSP header and sets nonce value to route options
 * cspNonceValue - a user generated CSP nonce value. 
 * cspHeader - boolean || function. electrode generates nonce and sets CSP header if set to true. 
 * App can pass a custom function in cspHeader. Return value should be a nonce. Electrode will use
 * this nonce to set CSP header
 * 
 * @param {*} param0 
 * @returns nonce value
 */
function setCSPHeader({ routeOptions }) {
  // If user sets cspNonce value through route options, use the same.
  if (routeOptions && routeOptions.cspNonceValue) {
    return routeOptions.cspNonceValue;
  }
  // User can set boolean or pass a function that generates Nonce as `cspHeader`
  else if (routeOptions && routeOptions.cspHeader) {
    switch(typeof routeOptions.cspHeader) {
      case "boolean": {
        routeOptions.cspNonceValue = nonceGenerator();
        break;
      };
      case "function": {
        routeOptions.cspNonceValue = routeOptions.cspHeader();
        break;
      };
      default: {
        routeOptions.cspNonceValue = nonceGenerator();
        break;
      }
    }
  }
  
  return routeOptions.cspNonceValue;
}

module.exports = {
  getSrcDir,
  getDefaultRouteOptions,
  updateFullTemplate,
  errorResponse,
  makeErrorStackResponse,
  checkSSRMetricsReporting,
  invokeTemplateProcessor,
  setCSPHeader
};
