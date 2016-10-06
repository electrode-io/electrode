"use strict";

var archetype = require("../archetype");
var _ = archetype.devRequire("lodash");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

var coverageConfig = require("./partial/coverage");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");
var testConfig = require("./base-test.js");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  coverageConfig(),
  inlineSourcemapsConfig()
)();
