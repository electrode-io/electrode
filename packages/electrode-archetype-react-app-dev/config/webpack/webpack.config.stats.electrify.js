"use strict";
/**
 * Webpack dev static configuration
 */
var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;

var baseConfig = require("./base.js");
var statsConfig = require("./partial/stats.js");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  statsConfig({
    fullPaths: true
  })
)();
