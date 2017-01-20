"use strict";

var archetype = require("../archetype");
var _ = archetype.devRequire("lodash");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var WebpackConfig = archetype.devRequire("webpack-config").default;
var getRootConfig = require("./get-root-config");

var testConfig = require("./base-test.js");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  inlineSourcemapsConfig()
)()).merge(getRootConfig("webpack.config.test.js"));
