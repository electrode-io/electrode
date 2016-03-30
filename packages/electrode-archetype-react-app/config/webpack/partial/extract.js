"use strict";

var mergeWebpackConfig = require("webpack-partial").default;

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var autoprefixer = require("autoprefixer-stylus");
var cssLoader = require.resolve("css-loader");
var styleLoader = require.resolve("style-loader");
var stylusLoader = require.resolve("stylus-loader");

module.exports = function () {
  return function (config) {
    var query = cssLoader + "!" + stylusLoader;
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "extract",
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract(styleLoader, query)
        }]
      },
      stylus: {
        use: [autoprefixer({ browsers: ["last 2 versions", "ie >= 9"] })]
      },
      plugins: [new ExtractTextPlugin("style.[hash].css")]
    });
  };
};
