"use strict";

const _ = require("lodash");
const Path = require("path");
const AsyncTemplate = require("./async-template");

const {
  resolveChunkSelector,
  loadAssetsFromStats,
  getStatsPath,
  invokeTemplateProcessor
} = require("./utils");

function makeRouteHandler(routeOptions) {
  const userTokenHandlers = [].concat(routeOptions.tokenHandler, routeOptions.tokenHandlers);

  let tokenHandlers = userTokenHandlers;

  if (!routeOptions.replaceTokenHandlers) {
    const reactTokenHandlers = Path.join(__dirname, "react/token-handlers");
    tokenHandlers =
      userTokenHandlers.indexOf(reactTokenHandlers) < 0
        ? [reactTokenHandlers].concat(userTokenHandlers)
        : userTokenHandlers;
  }

  const asyncTemplate = new AsyncTemplate({
    htmlFile: routeOptions.htmlFile,
    tokenHandlers: tokenHandlers.filter(x => x),
    insertTokenIds: routeOptions.insertTokenIds,
    routeOptions
  });

  invokeTemplateProcessor(asyncTemplate, routeOptions);
  asyncTemplate.initializeRenderer();

  return options => {
    return asyncTemplate.render(options);
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
      host: process.env.WEBPACK_DEV_HOST || process.env.WEBPACK_HOST || "127.0.0.1",
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
  pluginOptions.__internals = _.defaultsDeep({}, pluginOptions.__internals, {
    assets,
    chunkSelector,
    devBundleBase
  });

  return pluginOptions;
};

const setupPathOptions = (routeOptions, path) => {
  const options = routeOptions.paths[path];
  return _.defaults(
    {
      htmlFile: options.htmlFile,
      tokenHandler: options.tokenHandler,
      tokenHandlers: options.tokenHandlers
    },
    routeOptions
  );
};

const resolveContent = (content, xrequire) => {
  const resolveTime = Date.now();

  if (!_.isString(content) && !_.isFunction(content) && content.module) {
    const mod = content.module.startsWith(".") ? Path.resolve(content.module) : content.module;

    xrequire = xrequire || require;

    try {
      return {
        fullPath: xrequire.resolve(mod),
        xrequire,
        resolveTime,
        content: xrequire(mod)
      };
    } catch (error) {
      const msg = `electrode-react-webapp: load SSR content ${mod} failed - ${error.message}`;
      console.error(msg, "\n", error); // eslint-disable-line
      return {
        fullPath: null,
        error,
        resolveTime,
        content: msg
      };
    }
  }

  return {
    fullPath: null,
    resolveTime,
    content
  };
};

module.exports = {
  setupOptions,
  setupPathOptions,
  makeRouteHandler,
  resolveContent
};
