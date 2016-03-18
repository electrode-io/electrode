"use strict";
/**
 * Webpack hot configuration
 */
var _ = require("lodash");
var path = require("path");
var mergeWebpackConfig = require("webpack-partial").default;
var config = require("./webpack.config.dev");

mergeWebpackConfig(config, {
  devtool: "eval",
  output: {
    publicPath: "http://dev.walmart.com:2992/js"
  },
  entry: [
    "webpack-dev-server/client?http://dev.walmart.com:2992",
    "webpack/hot/only-dev-server",
    config.entry
  ]
});

config.devServer = {}; // use webpack default verbosity

/****
 * Hot Mods
 */
var babel = _.find(config.module.loaders, {name: "babel"});

// update babel loaders for hot loading
babel.loaders = [].concat(["react-hot"], babel.loaders);
babel.include = path.join(process.cwd(), "client");

module.exports = config;
