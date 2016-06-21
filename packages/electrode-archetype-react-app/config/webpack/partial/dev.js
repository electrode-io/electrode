"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var ExtractTextPlugin = archDevRequire("extract-text-webpack-plugin");
var webpack = archDevRequire("webpack");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      output: {
        filename: "[name].bundle.dev.js",
        publicPath: "http://dev.walmart.com:2992/js/"
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin("[file].map"),
        new ExtractTextPlugin("[name].style.css"),
        new webpack.NoErrorsPlugin()
      ]
    });
  };
};
