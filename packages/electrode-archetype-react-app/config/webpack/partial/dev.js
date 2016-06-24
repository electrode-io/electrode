"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var ExtractTextPlugin = archDevRequire("extract-text-webpack-plugin");
var webpack = archDevRequire("webpack");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      output: {
        publicPath: "http://dev.walmart.com:2992/js/",
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
