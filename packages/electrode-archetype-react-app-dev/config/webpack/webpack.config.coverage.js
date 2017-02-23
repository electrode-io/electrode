"use strict";

const _ = require("lodash");
const mergeWebpackConfig = require("webpack-partial").default;
const WebpackConfig = require("webpack-config").default;
const getRootConfig = require("./get-root-config");

const coverageConfig = require("./partial/coverage");
const inlineSourcemapsConfig = require("./partial/sourcemaps-inline");
const testConfig = require("./base-test.js");
const simpleProgress = require("./partial/simple-progress");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  coverageConfig(),
  inlineSourcemapsConfig(),
  simpleProgress()
)()).merge(getRootConfig("webpack.config.coverage.js"));
