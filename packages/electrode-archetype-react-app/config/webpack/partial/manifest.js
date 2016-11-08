"use strict";
var path = require('path');
var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var fileLoader = archetype.devRequire.resolve("file-loader");
var webAppManifestLoader = require.resolve("web-app-manifest-loader");
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = function () {
  return function (config) {
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
        new SWPrecacheWebpackPlugin({
          cacheId: 'electrode',
          filepath: 'dist/sw.js',
          maximumFileSizeToCacheInBytes: 4194304
        }),
      ]
    });
  };
};
