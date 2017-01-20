"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = require("webpack-partial").default;
var fileLoader = require.resolve("file-loader");
var isomorphicLoader = require.resolve("isomorphic-loader");
var cdnLoader = require.resolve('electrode-cdn-file-loader');

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/i,
          loader: cdnLoader + "?limit=10000!" + isomorphicLoader
        }]
      }
    });
  };
};
