"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var fileLoader = archetype.devRequire.resolve("file-loader");
var isomorphicLoader = require.resolve("isomorphic-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/i,
          loader: fileLoader + "?limit=10000!" + isomorphicLoader
        }]
      }
    });
  };
};
