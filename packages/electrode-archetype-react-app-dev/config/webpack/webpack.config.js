"use strict";

var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;
var WebpackConfig = require("webpack-config").default;
var getRootConfig = require("./get-root-config");
var addDllReferences = require("./add-dll-references");

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var optimizeConfig = require("./partial/optimize");
var localesConfig = require("./partial/locales");
var productionSourcemapsConfig = require("./partial/sourcemaps-remote");
var failConfig = require("./partial/fail");
var simpleProgress = require("./partial/simple-progress");

var config = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  optimizeConfig(),
  localesConfig(),
  defineConfig(),
  productionSourcemapsConfig(),
  failConfig(),
  simpleProgress()
)()).merge(getRootConfig("webpack.config.js"));

addDllReferences(config);

module.exports = config;
