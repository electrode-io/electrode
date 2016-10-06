"use strict";
/**
 * Webpack dev static configuration
 */
var archetype = require("../archetype");
var _ = archetype.devRequire("lodash");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

var baseConfig = require("./base.js");
var statsConfig = require("./partial/stats.js");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  statsConfig({
    fullPaths: true
  })
)();
