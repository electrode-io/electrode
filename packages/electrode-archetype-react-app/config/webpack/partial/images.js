"use strict";

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var mergeWebpackConfig = require("webpack-partial").default;
var cdnLoader = require.resolve("@walmart/cdn-file-loader");
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
          loader: cdnLoader + "?limit=10000"
        }]
      },
      plugins: [
        isoToolsPlugin
      ]
    });
  };
};
