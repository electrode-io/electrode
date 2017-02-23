"use strict";

const _ = require("lodash");
const mergeWebpackConfig = require("webpack-partial").default;
const WebpackConfig = require("webpack-config").default;
const getRootConfig = require("./get-root-config");

const baseConfig = require("./base.js");
const defineConfig = require("./partial/define.js");
const optimizeConfig = require("./partial/optimize");
const localesConfig = require("./partial/locales");
const coverageConfig = require("./partial/coverage");
const inlineSourcemapsConfig = require("./partial/sourcemaps-inline");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  optimizeConfig(),
  localesConfig(),
  defineConfig(),
  coverageConfig(),
  inlineSourcemapsConfig()
)()).merge(getRootConfig("webpack.config.browsercoverage.js"));
