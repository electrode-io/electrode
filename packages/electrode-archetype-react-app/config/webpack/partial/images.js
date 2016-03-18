"use strict";

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var mergeWebpackConfig = require("webpack-partial").default;
var urlLoader = require.resolve("url-loader");
var isoToolsPlugin = new WebpackIsomorphicToolsPlugin(require("../webpack-isomorphic-tools-config"));

if (process.env.NODE_ENV !== "production") {
  isoToolsPlugin = isoToolsPlugin.development();
}

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: isoToolsPlugin.regular_expression('images'),
          loader: urlLoader + "?limit=10000"
        }]
      },
      plugins: [
        isoToolsPlugin
      ]
    });
  };
};
