"use strict";
/**
 * Webpack hot configuration
 */
var path = require("path");

var _ = require("lodash");

var config = require("./webpack.config.dev");

config.devtool = "eval";
config.devServer = {}; // use webpack default verbosity
config.entry = [
  "webpack-dev-server/client?http://dev.walmart.com:2992",
  "webpack/hot/only-dev-server",
  config.entry
];
config.output.publicPath = "http://dev.walmart.com:2992/js";


/****
 * Hot Mods
 */
var babel = _.find(config.module.loaders, { name: "babel" });

// update babel loaders for hot loading
babel.loaders = [].concat(["react-hot"], babel.loaders);
babel.include = path.join(process.cwd(), "client");

module.exports = config;

