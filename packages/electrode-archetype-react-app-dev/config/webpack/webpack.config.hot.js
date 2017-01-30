"use strict";
/**
 * Webpack hot configuration
 */

process.env.HMR = "true";

var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;
var hotConfig = require("./partial/hot");
var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var devConfig = require("./partial/dev.js");
var WebpackConfig = require("webpack-config").default;
var getRootConfig = require("./get-root-config");

var config = module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig(),
  hotConfig()
)();

module.exports = new WebpackConfig()
  .merge(config)
  .merge(getRootConfig("webpack.config.hot.js"));
