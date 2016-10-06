"use strict";

var archetype = require("../archetype");
var _ = archetype.devRequire("lodash");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

var testConfig = require("./base-test.js");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  inlineSourcemapsConfig()
)();
