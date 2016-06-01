"use strict";

var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var optimizeConfig = require("./partial/optimize");
var localesConfig = require("./partial/locales");
var coverageConfig = require("./partial/coverage");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  optimizeConfig(),
  localesConfig(),
  defineConfig(),
  coverageConfig(),
  inlineSourcemapsConfig()
)();
