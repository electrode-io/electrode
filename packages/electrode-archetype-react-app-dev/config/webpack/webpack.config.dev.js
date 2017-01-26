"use strict";
/**
 * Webpack dev configuration
 */
var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;
var WebpackConfig = require("webpack-config").default;
var getRootConfig = require("./get-root-config");

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var devConfig = require("./partial/dev.js");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig()
)()).merge(getRootConfig("webpack.config.dev.js"));
