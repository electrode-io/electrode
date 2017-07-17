"use strict";

const _ = require("lodash");
const Promise = require("bluebird");
const fs = require("fs");
const Path = require("path");

/* eslint-disable no-magic-numbers */

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
    return require(Path.join(process.cwd(), options.bundleChunkSelector)); // eslint-disable-line
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
  return Promise.resolve(Path.resolve(statsPath))
    .then(require)
    .then(stats => {
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
    })
    .catch(() => ({}));
}

function readFileSafe(filePath) {
  return new Promise(resolve => {
    fs.readFile(Path.resolve(filePath), (err, data) => {
      if (err) return resolve("");
      return resolve(data.toString());
    });
  });
}

function getIconStats(iconStatsPath) {
  let iconStats;

  return readFileSafe(iconStatsPath).then(contents => {
    try {
      iconStats = JSON.parse(contents);
    } catch (err) {
      return "";
    }
    if (iconStats && iconStats.html) {
      return iconStats.html.join("");
    }
    return iconStats;
  });
}

function getCriticalCSS(filePath) {
  return readFileSafe(filePath).then(criticalCSS => {
    return criticalCSS.length ? `<style>${criticalCSS}</style>` : "";
  });
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
    ? Path.resolve(process.cwd(), buildArtifactsPath, "stats.json")
    : statsFilePath;
}

// Strip the {{}} delimiters off the token
function stripTokenDelimiters(token) {
  return _.trimEnd(_.trimStart(token, ["{", "~"]), ["}"]);
}

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

module.exports = {
  resolveChunkSelector,
  loadAssetsFromStats,
  getIconStats,
  getCriticalCSS,
  getStatsPath,
  stripTokenDelimiters,
  isPromise
};
