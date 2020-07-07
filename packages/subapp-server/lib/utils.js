"use strict";

/* eslint-disable no-console, no-magic-numbers */

// Copy from electrode-react-webapp for now

const assert = require("assert");
const _ = require("lodash");
const Path = require("path");
const Boom = require("@hapi/boom");
const optionalRequire = require("optional-require")(require);
const getDevProxy = optionalRequire("@xarc/app-dev/config/get-dev-proxy");
const HttpStatusCodes = require("http-status-codes");
const {
  utils: { loadFuncFromModule }
} = require("@xarc/index-page");

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

module.exports = {
  getDefaultRouteOptions,
  updateFullTemplate,
  errorResponse,
  makeErrorStackResponse,
  checkSSRMetricsReporting,
  invokeTemplateProcessor
};
