"use strict";
var path = require('path');
var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var fileLoader = archetype.devRequire.resolve("file-loader");
var webAppManifestLoader = require.resolve("web-app-manifest-loader");
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');


var runtimeCachePath = path.resolve(process.cwd(), 'client/pwa-runtime-cache.json');

function getRuntimeCacheJSON() {
  var runtimeCacheJSON;

  try {
    runtimeCacheJSON = require(runtimeCachePath);
  } catch(err) {
    runtimeCacheJSON = [];
  }

  return runtimeCacheJSON;
}

module.exports = function () {
  return function (config) {
    var runtimeCacheJSON = getRuntimeCacheJSON();
    var precacheConfig = {
      cacheId: 'electrode',
      filepath: 'dist/sw.js',
      maximumFileSizeToCacheInBytes: 4194304
    };

    if (runtimeCacheJSON && runtimeCacheJSON.length) {
      precacheConfig.runtimeCaching = runtimeCacheJSON.map(function(runtimeCache) {
        return {
          handler: runtimeCache.handler,
          urlPattern: new RegExp(runtimeCache.urlPattern)
        }
      });
    }

    return mergeWebpackConfig(config, {
      module: {
        loaders: [
          {
            test: /manifest.json$/,
            loader: fileLoader + '?name=manifest.json!' + webAppManifestLoader
          }
        ]
      },
      plugins: [
        new SWPrecacheWebpackPlugin(precacheConfig)
      ]
    });
  };
};
