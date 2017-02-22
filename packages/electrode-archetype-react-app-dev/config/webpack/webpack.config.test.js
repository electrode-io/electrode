"use strict";

const _ = require("lodash");
const mergeWebpackConfig = require("webpack-partial").default;
const WebpackConfig = require("webpack-config").default;
const getRootConfig = require("./get-root-config");

const testConfig = require("./base-test.js");
const inlineSourcemapsConfig = require("./partial/sourcemaps-inline");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, testConfig),
  inlineSourcemapsConfig()
)()).merge(getRootConfig("webpack.config.test.js"));
