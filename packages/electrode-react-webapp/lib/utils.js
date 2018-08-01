"use strict";

/* eslint-disable no-magic-numbers, no-console */

const _ = require("lodash");
const fs = require("fs");
const Path = require("path");

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

const resolvePath = path => (!Path.isAbsolute(path) ? Path.resolve(path) : path);

module.exports = {
  resolveChunkSelector,
  loadAssetsFromStats,
  getIconStats,
  getCriticalCSS,
  getStatsPath,
  resolvePath,
  htmlifyError
};
