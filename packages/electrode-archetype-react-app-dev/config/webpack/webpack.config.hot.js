"use strict";
/**
 * Webpack hot configuration
 */

process.env.HMR = "true";

const _ = require("lodash");
const mergeWebpackConfig = require("webpack-partial").default;
const hotConfig = require("./partial/hot");
const baseConfig = require("./base.js");
const defineConfig = require("./partial/define.js");
const devConfig = require("./partial/dev.js");
const WebpackConfig = require("webpack-config").default;
const getRootConfig = require("./get-root-config");

const config = module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig(),
  hotConfig()
)();

module.exports = new WebpackConfig()
  .merge(config)
  .merge(getRootConfig("webpack.config.hot.js"));
