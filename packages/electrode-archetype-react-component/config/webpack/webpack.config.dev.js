const webpack = require("webpack");
const config = require("./webpack.config");

config.output.filename = config.output.filename.replace(/\.min\.js$/, ".js");

config.plugins = [
  new webpack.SourceMapDevToolPlugin("[file].map")
];

// Export mutated base.
module.exports = config;
