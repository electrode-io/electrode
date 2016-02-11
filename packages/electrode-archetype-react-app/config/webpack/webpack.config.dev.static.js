"use strict";
/**
 * Webpack dev configuration
 */
var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

var config = require("./webpack.config");

config.output.filename = "bundle.dev.js";
config.output.publicPath = "http://dev.walmart.com:3000/js/";

config.plugins = [
  new webpack.SourceMapDevToolPlugin("[file].map"),
  new ExtractTextPlugin("style.css"),
  new webpack.NoErrorsPlugin(),
  new StatsWriterPlugin({
    filename: "../server/stats.json"
  })
];

module.exports = config;

