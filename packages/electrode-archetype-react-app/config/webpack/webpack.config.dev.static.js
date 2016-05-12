"use strict";
/**
 * Webpack dev static configuration
 */
var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var _ = archDevRequire("lodash");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var devConfig = require("./partial/dev.js");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig()
)();
