"use strict";

const _ = require("lodash");
const Path = require("path");
const AsyncTemplate = require("./async-template");

const utils = require("./utils");

const resolveChunkSelector = utils.resolveChunkSelector;
const loadAssetsFromStats = utils.loadAssetsFromStats;
const getStatsPath = utils.getStatsPath;

function makeRouteHandler(routeOptions) {
  const userTokenHandlers = [].concat(routeOptions.tokenHandler, routeOptions.tokenHandlers);
  const reactTokenHandlers = Path.join(__dirname, "react/token-handlers");

  const tokenHandlers =
    userTokenHandlers.indexOf(reactTokenHandlers) < 0
      ? [reactTokenHandlers].concat(userTokenHandlers)
      : userTokenHandlers;

  const asyncTemplate = new AsyncTemplate({
    htmlFile: routeOptions.htmlFile,
    tokenHandlers: tokenHandlers.filter(x => x),
    routeOptions
  });

  return options => asyncTemplate.render(options);
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
  const devBundleBase = `${devProtocol}${pluginOptions.devServer.host}:${
    pluginOptions.devServer.port
  }/js/`;
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
