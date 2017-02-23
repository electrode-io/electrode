"use strict";
/**
 * Webpack dev static configuration
 */
const _ = require("lodash");
const mergeWebpackConfig = require("webpack-partial").default;

const baseConfig = require("./base.js");
const statsConfig = require("./partial/stats.js");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  statsConfig({
    fullPaths: true
  })
)();
