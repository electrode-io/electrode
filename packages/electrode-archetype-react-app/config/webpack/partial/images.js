"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var fileLoader = require.resolve("file-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "static",
          test: /\.(ttf|eot|svg|png|gif|jpe?g)$/,
          loader: fileLoader
        }]
      }
    });
  };
};
