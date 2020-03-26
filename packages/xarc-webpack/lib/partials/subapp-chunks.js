"use strict";

/* eslint-disable global-require, no-magic-numbers */

const Crypto = require("crypto");

const splitMap = {};

function hashChunks(mod, chunks, key) {
  const chunkNames = chunks.map(c => c.name).sort();
  const id = `${key}~${chunkNames.join("~")}`;
  let digest = splitMap[id];
  if (!digest) {
    const hash = Crypto.createHash("md5");
    hash.update(id);
    digest = hash.digest("hex");
    splitMap[id] = digest;
  }
  digest = digest.substr(-8);
  // subapp-web/lib/util.js will try to match <entryName>.~ to detect subapp bundles
  return `${key}.~${digest}`;
}

function makeConfig() {
  const { AppMode, webpack } = require("@xarc/app/config/archetype");

  const config = {};

  if (!AppMode.hasSubApps) {
    return config;
  }

  if (webpack.minimizeSubappChunks) {
    config.optimization = {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          common: {
            chunks: "all",
            minChunks: 10,
            enforce: true,
            name: "common"
          }
        }
      }
    };
  } else {
    // use webpack splitChunks optimization to automatically put modules
    // shared by subapps into common bundles.
    // The common bundles will be determined by the splitChunks parameters.
    // The filename has the pattern of hex-sum.bundle1~bundle2~bundle#.js
    // https://webpack.js.org/plugins/split-chunks-plugin/
    config.optimization = {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        minSize: 30 * 1024,
        maxSize: 0,
        minChunks: 2,
        maxAsyncRequests: 500,
        maxInitialRequests: 500,
        automaticNameDelimiter: "~",
        automaticNameMaxLength: 250,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksname
            name: hashChunks,
            priority: -10,
            reuseExistingChunk: true
          },
          shared: {
            name: hashChunks,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    };
  }

  return config;
}

module.exports = makeConfig;
