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
    cspNonceValue: undefined, 
    // if `true`, electrode will generate nonce and add CSP header
    cspNonce: false, 
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
  return token.substring(0, token.length - 2);
}

/**
 * Sets CSP nonce to routeOptions and returns the nonce value
 * cspNonce - boolean || object || string
 * 
 * @param {*} param0 
 * @returns nonce value
 */
function setCSPNonce({ routeOptions }) {
  let nonce = nonceGenerator();
  
  switch(typeof routeOptions.cspNonce) {
    // if cspNonce is a string, electrode validates it for nonce value and uses the same to set CSP header
    case "string": {
      assert(routeOptions.cspNonce.match(/^[A-Za-z0-9+=\/]{22}$/), "Error: unable to set CSP header. Invalid nonce value passed!");

      routeOptions.cspNonceValue = {
        styleNonce: routeOptions.cspNonce,
        scriptNonce: routeOptions.cspNonce
      };
      break;
    };

    // if cspNonce is true, electrode will generate nonce and sets CSP header for both 
    // styles and script.
    case "boolean": {
      nonce = !!routeOptions.cspNonce === true ? nonce : ""
      routeOptions.cspNonceValue = {
        styleNonce: nonce,
        scriptNonce: nonce
      };
      break;
    };
    // if cspHeader is an object, app should explicitly enable it for script and/or style. 
    // cspHeader: { style: true } - will enable nonce only for styles
    case "object": {
      routeOptions.cspNonceValue = {
        styleNonce: routeOptions.cspNonce && !!routeOptions.cspNonce.style === true ? nonce : "",
        scriptNonce: routeOptions.cspNonce && !!routeOptions.cspNonce.script  === true ? nonce : ""
      };
      break;
    };
    // TODO: add 'case' so that app can pass a nonce generator function.
    
    default: {
      routeOptions.cspNonceValue = {
        styleNonce: "",
        scriptNonce: ""
      };
      break;
    }
  }
  
  return routeOptions.cspNonceValue;
}

function getCSPHeader({ styleNonce = "", scriptNonce = "" }) {
  const unsafeEval = process.env.NODE_ENV !== "production" ? 
        `'unsafe-eval'` : "";

  const styleSrc = styleNonce ? `style-src 'nonce-${styleNonce}' 'strict-dynamic';` : "";
  
  const scriptSrc = scriptNonce ? `script-src 'nonce-${scriptNonce}' 'strict-dynamic' ${unsafeEval}; `: "";

  return { scriptSrc, styleSrc };
}

module.exports = {
  getSrcDir,
  getDefaultRouteOptions,
  updateFullTemplate,
  errorResponse,
  makeErrorStackResponse,
  checkSSRMetricsReporting,
  invokeTemplateProcessor,
  setCSPNonce,
  getCSPHeader
};
