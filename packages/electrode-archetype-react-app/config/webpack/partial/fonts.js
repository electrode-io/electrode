"use strict";

var mergeWebpackConfig = require("webpack-partial").default;

var urlLoader = require.resolve("url-loader");
var fileLoader = require.resolve("file-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "woff",
          test: /\.woff(2)?$/,
          loader: urlLoader + "?limit=10000&mimetype=application/font-woff"
        }, {
          name: "fonts",
          test: /\.(ttf|eot)$/,
          loader: fileLoader
        }]
      }
    });
  };
};
