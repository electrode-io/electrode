"use strict";
/**
 * Webpack dev configuration
 */
var path = require("path");
var webpack = require("webpack");

var babelLoader = require.resolve("babel-loader");
var styleLoader = require.resolve("style-loader");
var cssLoader = require.resolve("css-loader");
var stylusLoader = require.resolve("stylus-loader");
var urlLoader = require.resolve("url-loader");
var fileLoader = require.resolve("file-loader");

var base = require("./webpack.config.demo.dev.js");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  cache: true,
  context: base.context,
  entry: base.entry,
  output: {
    path: path.join(process.cwd(), "dist/js"),
    filename: "bundle.dev.js",
    publicPath: "http://127.0.0.1:2992/js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: babelLoader
      },
      { test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          styleLoader, cssLoader + "!" + stylusLoader) },
      { test: /\.woff(2)?$/,
        loader: urlLoader + "?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg|png)$/,
        loader: fileLoader }
    ]
  },
  stylus: base.stylus,
  resolve: base.resolve,
  resolveLoader: base.resolveLoader,
  plugins: [
    new webpack.SourceMapDevToolPlugin("[file].map"),
    new ExtractTextPlugin("style.css")
  ]
};
