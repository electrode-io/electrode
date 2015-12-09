"use strict";

var webpack = require("webpack");
var config = require("./webpack.config");

config.plugins = [
  new webpack.SourceMapDevToolPlugin("bundle.map")
];

// Export mutated base.
module.exports = config;
