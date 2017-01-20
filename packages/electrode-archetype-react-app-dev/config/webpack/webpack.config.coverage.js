"use strict";

var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;
var WebpackConfig = require("webpack-config").default;
var getRootConfig = require("./get-root-config");

var coverageConfig = require("./partial/coverage");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");
var testConfig = require("./base-test.js");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  coverageConfig(),
  inlineSourcemapsConfig()
)()).merge(getRootConfig("webpack.config.coverage.js"));
