"use strict";

var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;

var coverageConfig = require("./partial/coverage");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");
var testConfig = require("./base-test.js");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  coverageConfig(),
  inlineSourcemapsConfig()
)();
