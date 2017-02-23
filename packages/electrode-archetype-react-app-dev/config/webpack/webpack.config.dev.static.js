"use strict";
/**
 * Webpack dev static configuration
 */
const _ = require("lodash");
const mergeWebpackConfig = require("webpack-partial").default;
const WebpackConfig = require("webpack-config").default;
const getRootConfig = require("./get-root-config");

const baseConfig = require("./base.js");
const defineConfig = require("./partial/define.js");
const devConfig = require("./partial/dev.js");

module.exports = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig()
)()).merge(getRootConfig("webpack.config.dev.static.js"));
