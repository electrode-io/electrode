"use strict";
/**
 * Webpack dev configuration
 */
var webpack = require("webpack");
var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var mergeWebpackConfig = require("webpack-partial").default;

var config = require("./webpack.config");

config = mergeWebpackConfig(config, {
  output: {
    filename: "bundle.dev.js",
    path: path.join(process.cwd(), "dist/js"),
    publicPath: "http://dev.walmart.com:2992/js"
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin("[file].map"),
    new ExtractTextPlugin("style.css"),
    new webpack.NoErrorsPlugin(),
    new StatsWriterPlugin({
      filename: "../server/stats.json"
    })
  ]
});

module.exports = config;
