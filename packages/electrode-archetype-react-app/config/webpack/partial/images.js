"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var urlLoader = require.resolve("url-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: /\.(svg|png|gif|jpe?g)$/,
          loader: urlLoader + "?limit=10000"
        }]
      }
    });
  };
};
