"use strict";

var archetype = require("../../archtype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var ExtractTextPlugin = archetype.devRequire("extract-text-webpack-plugin");
var webpack = archetype.devRequire("webpack");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      output: {
        publicPath: `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}/js/`,
        filename: config.__wmlMultiBundle
          ? "[name].bundle.dev.js"
          : "bundle.dev.js"
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin("[file].map"),
        new ExtractTextPlugin(config.__wmlMultiBundle ? "[name].style.css" : "style.css"),
        new webpack.NoErrorsPlugin()
      ]
    });
  };
};
