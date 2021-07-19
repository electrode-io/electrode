"use strict";

const _ = require("lodash");
const Path = require("path");
const { TagRenderer } = require("@xarc/tag-renderer");
const { JsxRenderer, xarcJsxElement } = require("@xarc/jsx-renderer");
const { loadTokenModuleHandler } = require("@xarc/render-context");
const {
  utils: {
    resolvePath,
    getOtherStats,
    getOtherAssets,
    resolveChunkSelector,
    loadAssetsFromStats,
    getStatsPath,
    makeDevBundleBase
  }
} = require("@xarc/index-page");
const assert = require("assert");

const otherStats = getOtherStats();

/*eslint-disable max-statements*/
function initializeTemplate(
  { templateFile, tokenHandlers, cacheId, cacheKey, options },
  routeOptions,
  request
) {
  const url = _.get(request, "url.path", request.url);

  cacheKey = cacheKey || `${templateFile}#${cacheId}#${url}`;

  let asyncTemplate = routeOptions._templateCache[cacheKey];
  if (asyncTemplate) {
    return asyncTemplate;
  }

  if (options) {
    routeOptions = Object.assign({}, routeOptions, options);
  }

  const userTokenHandlers = []
    .concat(tokenHandlers, routeOptions.tokenHandler, routeOptions.tokenHandlers)
    .filter(x => x);

  let finalTokenHandlers = userTokenHandlers;

  // Inject the built-in react/token-handlers if it is not in user's handlers
  // and replaceTokenHandlers option is false
  if (!routeOptions.replaceTokenHandlers) {
    const reactTokenHandlers = require.resolve("@xarc/index-page");
    finalTokenHandlers =
      userTokenHandlers.indexOf(reactTokenHandlers) < 0
        ? [reactTokenHandlers].concat(userTokenHandlers)
        : userTokenHandlers;
  }

  const templateFullPath = resolvePath(templateFile);
  const templateModule = require(templateFullPath); //  eslint-disable-line

  const templateExp = templateModule.templateTags || templateModule.default || templateModule;

  const template = typeof templateExp === "function" ? templateExp(routeOptions) : templateExp;

  if (template.$$typeof === xarcJsxElement || template.children) {
    // JSX
    asyncTemplate = new JsxRenderer({
      templateFullPath: Path.dirname(templateFullPath),
      template,
      tokenHandlers: finalTokenHandlers.filter(x => x),
      insertTokenIds: routeOptions.insertTokenIds,
      routeOptions
    });
  } else {
    // Tag
    asyncTemplate = new TagRenderer({
      templateTags: template,
      tokenHandlers: finalTokenHandlers.map(x => loadTokenModuleHandler(x)),
      insertTokenIds: routeOptions.insertTokenIds,
      routeOptions
    });
  }

  //

  asyncTemplate.initializeRenderer();

  return (routeOptions._templateCache[cacheKey] = asyncTemplate);
}

function makeRouteTemplateSelector(routeOptions) {
  routeOptions._templateCache = {};
  let defaultSelection;

  if (routeOptions.templateFile) {
    defaultSelection = {
      templateFile:
        typeof routeOptions.templateFile === "string"
          ? Path.resolve(routeOptions.templateFile)
          : Path.join(__dirname, "../template/index")
    };
  } else {
    defaultSelection = { htmlFile: routeOptions.htmlFile };
  }

  const render = (options, templateSelection) => {
    let selection = templateSelection || defaultSelection;
    if (templateSelection && !templateSelection.templateFile && !templateSelection.htmlFile) {
      selection = Object.assign({}, templateSelection, defaultSelection);
    }
    const asyncTemplate = initializeTemplate(selection, routeOptions, options.request);
    return asyncTemplate.render(options);
  };

  return options => {
    if (routeOptions.selectTemplate) {
      const selection = routeOptions.selectTemplate(options.request, routeOptions);

      if (selection && selection.then) {
        return selection.then(x => render(options, x));
      }

      return render(options, selection);
    }

    assert(!defaultSelection.htmlFile, `subapp-server doesn't support htmlFile templates`);

    const asyncTemplate = initializeTemplate(defaultSelection, routeOptions);
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
      protocol: https ? "https" : "http",
      host: process.env.WEBPACK_DEV_HOST || process.env.WEBPACK_HOST || "localhost",
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
  const devBundleBase = makeDevBundleBase(pluginOptions.devServer);
  const statsPath = getStatsPath(pluginOptions.stats, pluginOptions.buildArtifacts);

  const assets = loadAssetsFromStats(statsPath);
  const otherAssets = getOtherAssets(pluginOptions);
  pluginOptions.__internals = _.defaultsDeep({}, pluginOptions.__internals, {
    assets,
    otherAssets,
    chunkSelector,
    devBundleBase
  });

  return pluginOptions;
};

const pathSpecificOptions = [
  "htmlFile",
  "templateFile",
  "insertTokenIds",
  "pageTitle",
  "selectTemplate",
  "responseForBadStatus",
  "responseForError"
];

const setupPathOptions = (routeOptions, path) => {
  const pathData = _.get(routeOptions, ["paths", path], {});
  const pathOverride = _.get(routeOptions, ["paths", path, "overrideOptions"], {});
  const pathOptions = pathData.options;
  return _.defaultsDeep(
    _.pick(pathData, pathSpecificOptions),
    {
      tokenHandler: [].concat(routeOptions.tokenHandler, pathData.tokenHandler),
      tokenHandlers: [].concat(routeOptions.tokenHandlers, pathData.tokenHandlers)
    },
    pathOptions,
    _.omit(pathOverride, "paths"),
    routeOptions
  );
};

module.exports = { setupOptions, setupPathOptions, makeRouteTemplateSelector };
