"use strict";
/**
 * Webpack dev configuration
 */
var config = require("./webpack.config.dev.static");

config.output.publicPath = "http://dev.walmart.com:2992/js";

module.exports = config;

