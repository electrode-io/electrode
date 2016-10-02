"use strict";

var archetype = require("../../archtype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var fileLoader = archetype.devRequire.resolve("file-loader");
var isomorphicLoader = archetype.devRequire.resolve("isomorphic-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: fileLoader + "?limit=10000!" + isomorphicLoader
        }]
      }
    });
  };
};
