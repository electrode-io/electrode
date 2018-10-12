"use strict";

/* eslint-disable no-magic-numbers, no-console */

const _ = require("lodash");
const fs = require("fs");
const Path = require("path");
const requireAt = require("require-at");
const assert = require("assert");

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

/**
 * Load stats.json which is created during build.
 * Attempt to load the stats.json file which contains a manifest of
 * The file contains bundle files which are to be loaded on the client side.
 *
 * @param {string} statsPath - path of stats.json
 * @returns {Promise.<Object>} an object containing an array of file names
 */
function loadAssetsFromStats(statsPath) {
  let stats;
  try {
    stats = JSON.parse(fs.readFileSync(Path.resolve(statsPath)).toString());
  } catch (err) {
    return {};
  }
  const assets = {};
  const manifestAsset = _.find(stats.assets, asset => {
    return asset.name.endsWith("manifest.json");
  });
  const jsAssets = stats.assets.filter(asset => {
    return asset.name.endsWith(".js");
  });
  const cssAssets = stats.assets.filter(asset => {
    return asset.name.endsWith(".css");
  });

  if (manifestAsset) {
    assets.manifest = manifestAsset.name;
  }

  assets.js = jsAssets;
  assets.css = cssAssets;

  return assets;
}

function getIconStats(iconStatsPath) {
  let iconStats;
  try {
    iconStats = fs.readFileSync(Path.resolve(iconStatsPath)).toString();
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
    const criticalCSS = fs.readFileSync(criticalCSSPath).toString();
    return criticalCSS;
  } catch (err) {
    return "";
  }
}

/**
 * Resolves the path to the stats.json file containing our
 * asset list. In dev the stats.json file is written to a
 * build artifacts directory, while in produciton its contained
 * within the dist/server folder
 * @param  {string} statsFilePath      path to stats.json
 * @param  {string} buildArtifactsPath path to stats.json in dev
 * @return {string}                    current active path
 */
function getStatsPath(statsFilePath, buildArtifactsPath) {
  return process.env.WEBPACK_DEV === "true"
    ? Path.resolve(buildArtifactsPath, "stats.json")
    : statsFilePath;
}

function htmlifyError(err, withStack) {
  const html = err.html ? `<div>${err.html}</div>\n` : "";
  const errMsg = () => {
    if (withStack !== false && err.stack) {
      if (process.env.NODE_ENV !== "production") {
        const rgx = new RegExp(process.cwd(), "g");
        return err.stack.replace(rgx, "CWD");
      } else {
        return `- Not sending Error stack for production\n\nMessage: ${err.message}`;
      }
    } else {
      return err.message;
    }
  };
  return `<html><head><title>OOPS</title></head><body>
${html}
<pre>
${errMsg()}
</pre></body></html>`;
}

function getDevCssBundle(chunkNames, routeData) {
  const devBundleBase = routeData.devBundleBase;
  if (chunkNames.css) {
    const cssChunks = Array.isArray(chunkNames.css) ? chunkNames.css : [chunkNames.css];
    return _.map(cssChunks, chunkName => `${devBundleBase}${chunkName}.style.css`);
  } else {
    return [`${devBundleBase}style.css`];
  }
}

function getDevJsBundle(chunkNames, routeData) {
  const devBundleBase = routeData.devBundleBase;

  return chunkNames.js
    ? `${devBundleBase}${chunkNames.js}.bundle.dev.js`
    : `${devBundleBase}bundle.dev.js`;
}

function getProdBundles(chunkNames, routeData) {
  const assets = routeData.assets;

  return {
    jsChunk: _.find(assets.js, asset => _.includes(asset.chunkNames, chunkNames.js)),

    cssChunk: _.filter(assets.css, asset =>
      _.some(asset.chunkNames, assetChunkName => _.includes(chunkNames.css, assetChunkName))
    )
  };
}

function processRenderSsMode(request, renderSs, mode) {
  if (renderSs) {
    if (mode === "noss") {
      return false;
    } else if (renderSs === "datass" || mode === "datass") {
      renderSs = "datass";
      // signal user content callback to populate prefetch data only and skips actual SSR
      _.set(request, ["app", "ssrPrefetchOnly"], true);
    }
  }

  return renderSs;
}

function getCspNonce(request, cspNonceValue) {
  let scriptNonce = "";
  let styleNonce = "";

  if (cspNonceValue) {
    if (typeof cspNonceValue === "function") {
      scriptNonce = cspNonceValue(request, "script");
      styleNonce = cspNonceValue(request, "style");
    } else {
      scriptNonce = _.get(request, cspNonceValue.script);
      styleNonce = _.get(request, cspNonceValue.style);
    }
    scriptNonce = scriptNonce ? ` nonce="${scriptNonce}"` : "";
    styleNonce = styleNonce ? ` nonce="${styleNonce}"` : "";
  }

  return { scriptNonce, styleNonce };
}

const resolvePath = path => (!Path.isAbsolute(path) ? Path.resolve(path) : path);

function responseForError(request, routeOptions, err) {
  return {
    status: err.status || 500,
    html: htmlifyError(err, routeOptions.replyErrorStack)
  };
}

function responseForBadStatus(request, routeOptions, data) {
  return {
    status: data.status,
    html: (data && data.html) || data
  };
}

function loadFuncFromModule(modulePath, exportFuncName, requireAtDir) {
  const mod = requireAt(requireAtDir || process.cwd())(modulePath);
  const exportFunc = (exportFuncName && mod[exportFuncName]) || mod;
  assert(
    typeof exportFunc === "function",
    `loadFuncFromModule ${modulePath} doesn't export a usable function`
  );
  return exportFunc;
}

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
  resolveChunkSelector,
  loadAssetsFromStats,
  getIconStats,
  getCriticalCSS,
  getStatsPath,
  resolvePath,
  htmlifyError,
  getDevCssBundle,
  getDevJsBundle,
  getProdBundles,
  processRenderSsMode,
  getCspNonce,
  responseForError,
  responseForBadStatus,
  loadFuncFromModule,
  invokeTemplateProcessor
};
