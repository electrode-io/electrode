"use strict";
/**
 * Webpack dev configuration
 */
var archetype = require("../archetype");
var _ = archetype.devRequire("lodash");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var devConfig = require("./partial/dev.js");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig()
)();
