"use strict";
/**
 * Webpack dev configuration
 */
var webpack = require("webpack");
var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

var config = require("./webpack.config");

config.output.filename = "bundle.dev.js";

config.output = {
  filename: "bundle.dev.js",
  path: path.join(process.cwd(), "dist/js"),
  publicPath: "/js/"
};

config.plugins = [
  new webpack.SourceMapDevToolPlugin("[file].map"),
  new ExtractTextPlugin("style.css"),
  new webpack.NoErrorsPlugin(),
  new StatsWriterPlugin({
    filename: "../server/stats.json"
  })
];

module.exports = config;
