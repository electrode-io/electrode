"use strict";

var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;

var testConfig = require("./base-test.js");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  inlineSourcemapsConfig()
)();
