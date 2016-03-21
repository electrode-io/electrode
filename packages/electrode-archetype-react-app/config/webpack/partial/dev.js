"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      output: {
        filename: "bundle.dev.js",
        publicPath: "http://dev.walmart.com:2992/js/"
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin("[file].map"),
        new ExtractTextPlugin("style.css"),
        new webpack.NoErrorsPlugin()
      ]
    });
  };
};
