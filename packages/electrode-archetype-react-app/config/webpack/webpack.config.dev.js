"use strict";
/**
 * Webpack dev configuration
 */
const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = require("./webpack.config");

config.output.filename = "bundle.dev.js";
config.output.publicPath = "http://127.0.0.1:2992/js";

config.plugins = [
  new webpack.SourceMapDevToolPlugin("[file].map"),
  new ExtractTextPlugin("style.css"),
  new webpack.NoErrorsPlugin()
];

module.exports = config;

