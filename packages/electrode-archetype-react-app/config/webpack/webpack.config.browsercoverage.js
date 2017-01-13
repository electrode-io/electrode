"use strict";

var archetype = require("../archetype");
var _ = archetype.devRequire("lodash");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var WebpackConfig = archetype.devRequire("webpack-config").default;
var getRootConfig = require("./get-root-config");

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var optimizeConfig = require("./partial/optimize");
var localesConfig = require("./partial/locales");
var coverageConfig = require("./partial/coverage");
var inlineSourcemapsConfig = require("./partial/sourcemaps-inline");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  optimizeConfig(),
  localesConfig(),
  defineConfig(),
  coverageConfig(),
  inlineSourcemapsConfig()
)()).merge(getRootConfig("webpack.config.browsercoverage.js"));
