"use strict";
/**
 * Webpack dev configuration
 */
var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var devConfig = require("./partial/dev.js");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig()
)();
