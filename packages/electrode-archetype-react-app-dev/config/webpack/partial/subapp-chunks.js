"use strict";

const Crypto = require("crypto");
const { AppMode } = require("electrode-archetype-react-app/config/archetype");

const config = {};

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
  return `${key}~${digest}`;
}

if (AppMode.hasSubApps) {
  // use webpack splitChunks optimization to automatically put modules
  // shared by subapps into common bundles.
  // The common bundles will be determined by the splitChunks parameters.
  // The filename has the pattern of hex-sum.bundle1~bundle2~bundle#.js
  // https://webpack.js.org/plugins/split-chunks-plugin/
  config.optimization = {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksname
          name: hashChunks
        },
        shared: {
          name: hashChunks
        }
      }
      // minSize: 1 * 1024,
      // maxSize: 200 * 1024
    }
  };
}

module.exports = config;
