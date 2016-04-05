"use strict";

var IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");
var mergeWebpackConfig = require("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new IsomorphicLoaderPlugin({
          webpackDev: {
            url: "http://dev.walmart.com:2992",
            addUrl: false
          }
        })
      ]
    });
  };
};
