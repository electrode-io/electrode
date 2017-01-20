"use strict";
/**
 * Webpack dev static configuration
 */
var archetype = require("../archetype");
var _ = archetype.devRequire("lodash");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var WebpackConfig = archetype.devRequire("webpack-config").default;
var getRootConfig = require("./get-root-config");

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var devConfig = require("./partial/dev.js");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig()
)()).merge(getRootConfig("webpack.config.dev.static.js"));
