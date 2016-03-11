"use strict";

var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var optimizeConfig = require("./partial/optimize");
var productionSourcemapsConfig = require("./partial/sourcemaps-remote");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  optimizeConfig(),
  defineConfig(),
  productionSourcemapsConfig()
)();
