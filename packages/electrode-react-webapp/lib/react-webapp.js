"use strict";

const _ = require("lodash");
const Path = require("path");
const assert = require("assert");
const AsyncTemplate = require("./async-template");
const Fs = require("fs");
const otherStats = Fs.readdirSync(Path.resolve("dist/server"))
  .filter(x => x.endsWith("-stats.json"))
  .reduce((prev, x) => {
    const k = Path.basename(x).split("-")[0];
    prev[k] = `dist/server/${x}`;
    return prev;
  }, {});

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
  const https = process.env.WEBPACK_DEV_HTTPS && process.env.WEBPACK_DEV_HTTPS !== "false";
  const pluginOptionsDefaults = {
    pageTitle: "Untitled Electrode Web Application",
    webpackDev: process.env.WEBPACK_DEV === "true",
    renderJS: true,
    serverSideRendering: true,
    htmlFile: Path.join(__dirname, "index.html"),
    devServer: {
      host: process.env.WEBPACK_DEV_HOST || process.env.WEBPACK_HOST || "127.0.0.1",
      port: process.env.WEBPACK_DEV_PORT || "2992",
      https
    },
    unbundledJS: {
      enterHead: [],
      preBundle: [],
      postBundle: []
    },
    paths: {},
    stats: "dist/server/stats.json",
    otherStats,
    iconStats: "dist/server/iconstats.json",
    criticalCSS: "dist/js/critical.css",
    buildArtifacts: ".build",
    prodBundleBase: "/js/",
    cspNonceValue: undefined
  };

  const pluginOptions = _.defaultsDeep({}, options, pluginOptionsDefaults);
  const chunkSelector = resolveChunkSelector(pluginOptions);
  const devProtocol = https ? "https://" : "http://";
  const devBundleBase = `${devProtocol}${pluginOptions.devServer.host}:${
    pluginOptions.devServer.port
  }/js/`;
  const statsPath = getStatsPath(pluginOptions.stats, pluginOptions.buildArtifacts);

  const assets = loadAssetsFromStats(statsPath);
  const otherAssets = Object.entries(pluginOptions.otherStats).reduce((prev, [k, v]) => {
    prev[k] = loadAssetsFromStats(getStatsPath(v, pluginOptions.buildArtifacts));
    return prev;
  }, {});
  pluginOptions.__internals = _.defaultsDeep({}, pluginOptions.__internals, {
    assets,
    otherAssets,
    chunkSelector,
    devBundleBase
  });

  return pluginOptions;
};

const pathSpecificOptions = ["htmlFile", "responseForBadStatus", "responseForError"];

const setupPathOptions = (routeOptions, path) => {
  const pathData = _.get(routeOptions, ["paths", path], {});
  const pathOptions = pathData.options;
  return _.defaultsDeep(
    _.pick(pathData, pathSpecificOptions),
    {
      tokenHandler: [].concat(routeOptions.tokenHandler, pathData.tokenHandler),
      tokenHandlers: [].concat(routeOptions.tokenHandlers, pathData.tokenHandlers)
    },
    pathOptions,
    routeOptions
  );
};

//
// The route path can supply:
//
// - a literal string
// - a function
// - an object
//
// If it's an object:
//   -- if it doesn't contain content, then it's assume to be the content.
//
// If it contains content, then it can contain:
//
// - method: HTTP method for the route
// - config: route config (applicable for framework like Hapi)
// - content: second level field to define content
//
// content can be:
//
// - a literal string
// - a function
// - an object
//
// If content is an object, it can contain module, a path to the JS module to require
// to load the content.
//
const resolveContent = (pathData, xrequire) => {
  const resolveTime = Date.now();

  let content = pathData;

  // If it's an object, see if contains content field
  if (_.isObject(pathData) && pathData.hasOwnProperty("content")) {
    content = pathData.content;
  }

  if (!content && !_.isString(content)) return null;

  // content has module field, require it.
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

const getContentResolver = (registerOptions, pathData, path) => {
  let resolved;

  const resolveWithDev = (webpackDev, xrequire) => {
    if (!webpackDev.valid) {
      resolved = resolveContent("<!-- Webpack still compiling -->");
    } else if (webpackDev.hasErrors) {
      resolved = resolveContent("<!-- Webpack compile has errors -->");
    } else if (!resolved || resolved.resolveTime < webpackDev.compileTime) {
      if (resolved && resolved.fullPath) {
        delete resolved.xrequire.cache[resolved.fullPath];
      }
      resolved = resolveContent(pathData, xrequire);
    }

    return resolved.content;
  };

  return (webpackDev, xrequire) => {
    if (webpackDev) return resolveWithDev(webpackDev, xrequire);

    if (resolved) return resolved.content;

    if (registerOptions.serverSideRendering !== false) {
      resolved = resolveContent(pathData);
      assert(resolved, `You must define content for the webapp plugin path ${path}`);
    } else {
      resolved = {
        content: {
          status: 200,
          html: "<!-- SSR disabled by options.serverSideRendring -->"
        }
      };
    }

    return resolved.content;
  };
};

module.exports = {
  setupOptions,
  setupPathOptions,
  makeRouteHandler,
  resolveContent,
  getContentResolver
};
