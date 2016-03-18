"use strict";
/**
 * Webpack dev configuration
 */
var webpack = require("webpack");
var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var _ = require("lodash");

var config = require("./webpack.config");

_.merge(config, {
  output: {
    filename: "bundle.dev.js",
    path: path.join(process.cwd(), "dist/js"),
    publicPath: "/js/"
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin("[file].map"),
    new ExtractTextPlugin("style.css"),
    new webpack.NoErrorsPlugin(),
    new StatsWriterPlugin({
      filename: "../server/stats.json"
    })
  ]
}, function unionArray(a, b) {
  if (_.isArray(b) && _.isArray(a)) {
    return _.union(a, b);
  }
});

module.exports = config;
