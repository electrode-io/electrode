"use strict";
/**
 * Webpack dev configuration
 */
var path = require("path");
var webpack = require("webpack");
var base = require("./webpack.config");
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
  module: base.module,
  stylus: base.stylus,
  resolve: base.resolve,
  resolveLoader: base.resolveLoader,
  plugins: [
    new webpack.SourceMapDevToolPlugin("[file].map"),
    new ExtractTextPlugin("style.css"),
    new webpack.NoErrorsPlugin()
  ]
};
