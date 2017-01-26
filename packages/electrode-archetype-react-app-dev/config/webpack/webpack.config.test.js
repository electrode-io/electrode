"use strict";

var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;
var WebpackConfig = require("webpack-config").default;
var getRootConfig = require("./get-root-config");

var testConfig = require("./base-test.js");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  inlineSourcemapsConfig()
)()).merge(getRootConfig("webpack.config.test.js"));
