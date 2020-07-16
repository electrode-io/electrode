/* eslint-disable no-magic-numbers, no-console */

import * as _ from "lodash";
import * as fs from "fs";
import * as Path from "path";
import * as requireAt from "require-at";
import * as assert from "assert";
import * as Url from "url";

const HTTP_PORT = "80";

interface Asset {
  css?: string | Array<string>;
  js?: string | Array<string>;
  name?: string;
  manifest?: string;
}
/**
 * Tries to import bundle chunk selector function if the corresponding option is set in the
 * webapp plugin configuration. The function takes a `request` object as an argument and
 * returns the chunk name.
 *
 * @param {object} options - webapp plugin configuration options
 * @returns {Function} function that selects the bundle based on the request object
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
 * @returns {Promise.<object>} an object containing an array of file names
 */
function loadAssetsFromStats(statsPath) {
  let stats;
  try {
    stats = JSON.parse(fs.readFileSync(Path.resolve(statsPath)).toString());
  } catch (err) {
    return {};
  }
  const assets: Asset = {};
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

/**
 * @param iconStatsPath
 */
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

/**
 * @param path
 */
function getCriticalCSS(path = "") {
  const criticalCSSPath = Path.resolve(process.cwd(), path);

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
 *
 * @param  {string} statsFilePath      path to stats.json
 * @param  {string} buildArtifactsPath path to stats.json in dev
 * @returns {string}                    current active path
 */
function getStatsPath(statsFilePath, buildArtifactsPath) {
  return process.env.WEBPACK_DEV === "true"
    ? Path.resolve(buildArtifactsPath, "stats.json")
    : statsFilePath;
}

/**
 * @param err
 * @param withStack
 */
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

/**
 *
 * @param scripts
 * @param scriptNonce
 */
const htmlifyScripts = (scripts, scriptNonce) => {
  return scripts
    .map(x =>
      typeof x === "string"
        ? `<script${scriptNonce || ""}>${x}</script>\n`
        : x.map(n => `<script src="${n.src}"></script>`).join("\n")
    )
    .join("\n");
};

/**
 * @param chunkNames
 * @param routeData
 */
function getDevCssBundle(chunkNames, routeData) {
  const devBundleBase = routeData.devBundleBase;
  if (chunkNames.css) {
    const cssChunks = Array.isArray(chunkNames.css) ? chunkNames.css : [chunkNames.css];
    return _.map(cssChunks, chunkName => `${devBundleBase}${chunkName}.style.css`);
  } else {
    return [`${devBundleBase}style.css`];
  }
}

/**
 * @param chunkNames
 * @param routeData
 */
function getDevJsBundle(chunkNames, routeData) {
  const devBundleBase = routeData.devBundleBase;

  return chunkNames.js
    ? `${devBundleBase}${chunkNames.js}.bundle.dev.js`
    : `${devBundleBase}bundle.dev.js`;
}

/**
 * @param chunkNames
 * @param routeData
 */
function getProdBundles(chunkNames, routeData) {
  if (!routeData || !routeData.assets) {
    return {};
  }

  const { assets } = routeData;

  return {
    jsChunk: _.find(assets.js, asset => _.includes(asset.chunkNames, chunkNames.js)),

    cssChunk: _.filter(assets.css, asset =>
      _.some(asset.chunkNames, assetChunkName => _.includes(chunkNames.css, assetChunkName))
    )
  };
}

/**
 * @param request
 * @param renderSs
 * @param mode
 */
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

/**
 * @param request
 * @param cspNonceValue
 */
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

/**
 * @param request
 * @param routeOptions
 * @param err
 */
function responseForError(request, routeOptions, err) {
  return {
    status: err.status || 500,
    html: htmlifyError(err, routeOptions.replyErrorStack)
  };
}

/**
 * @param request
 * @param routeOptions
 * @param data
 */
function responseForBadStatus(request, routeOptions, data) {
  return {
    status: data.status,
    html: (data && data.html) || data
  };
}

/**
 * @param modulePath
 * @param exportFuncName
 * @param requireAtDir
 */
function loadFuncFromModule(modulePath, exportFuncName, requireAtDir = "") {
  const mod = requireAt(requireAtDir || process.cwd())(modulePath);
  const exportFunc = (exportFuncName && mod[exportFuncName]) || mod;
  assert(
    typeof exportFunc === "function",
    `loadFuncFromModule ${modulePath} doesn't export a usable function`
  );
  return exportFunc;
}

/**
 *
 */
function getOtherStats() {
  const otherStats = {};
  if (fs.existsSync("dist/server")) {
    fs.readdirSync("dist/server")
      .filter(x => x.endsWith("-stats.json"))
      .reduce((prev, x) => {
        const k = Path.basename(x).split("-")[0];
        prev[k] = `dist/server/${x}`;
        return prev;
      }, otherStats);
  }
  return otherStats;
}

/**
 * @param pluginOptions
 */
function getOtherAssets(pluginOptions) {
  return Object.entries(pluginOptions.otherStats).reduce((prev, [k, v]) => {
    prev[k] = loadAssetsFromStats(getStatsPath(v, pluginOptions.buildArtifacts));
    return prev;
  }, {});
}

/**
 * @param data
 * @param otherAssets
 */
function getBundleJsNameByQuery(data, otherAssets) {
  let { name } = data.jsChunk;
  const { __dist } = data.query;
  if (__dist && otherAssets[__dist]) {
    name = `${__dist}${name.substr(name.indexOf("."))}`;
  }
  return name;
}
const isReadableStream = x => Boolean(x && x.pipe && x.on && x._readableState);

const munchyHandleStreamError = err => {
  let errMsg = (process.env.NODE_ENV !== "production" && err.stack) || err.message;

  if (process.cwd().length > 3) {
    errMsg = (errMsg || "").replace(new RegExp(process.cwd(), "g"), "CWD");
  }

  return {
    result: `<!-- SSR ERROR -->
<p><h2 style="color: red">SSR ERROR</h2><pre style="color: red">
${errMsg}
</pre></p>`,
    remit: false
  };
};

const makeDevBundleBase = devServer => {
  const cdnProtocol = process.env.WEBPACK_DEV_CDN_PROTOCOL;
  const cdnHostname = process.env.WEBPACK_DEV_CDN_HOSTNAME;
  const cdnPort = process.env.WEBPACK_DEV_CDN_PORT;

  /*
   * If env specified custom CDN protocol/host/port, then generate bundle
   * URL with those.
   */
  if (cdnProtocol !== undefined || cdnHostname !== undefined || cdnPort !== undefined) {
    return Url.format({
      protocol: cdnProtocol || "http",
      hostname: cdnHostname || "localhost",
      // if CDN is also from standard HTTP port 80 then it's not needed in the URL
      port: cdnPort !== HTTP_PORT ? cdnPort : "",
      pathname: "/js/"
    });
  } else if (process.env.APP_SERVER_PORT) {
    return "/js/";
  } else {
    return Url.format({
      protocol: devServer.protocol,
      hostname: devServer.host,
      port: devServer.port,
      pathname: "/js/"
    });
  }
};

export {
  resolveChunkSelector,
  loadAssetsFromStats,
  getIconStats,
  getCriticalCSS,
  getStatsPath,
  resolvePath,
  htmlifyScripts,
  htmlifyError,
  getDevCssBundle,
  getDevJsBundle,
  getProdBundles,
  processRenderSsMode,
  getCspNonce,
  responseForError,
  responseForBadStatus,
  loadFuncFromModule,
  getOtherStats,
  getOtherAssets,
  getBundleJsNameByQuery,
  isReadableStream,
  munchyHandleStreamError,
  makeDevBundleBase
};
