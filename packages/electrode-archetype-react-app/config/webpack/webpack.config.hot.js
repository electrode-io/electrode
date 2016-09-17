"use strict";
/**
 * Webpack hot configuration
 */
var archetype = require("../archtype");
var _ = archetype.devRequire("lodash");
var path = require("path");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var hotConfig = require("./partial/hot");
var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var devConfig = require("./partial/dev.js");

var config = module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  defineConfig(),
  devConfig(),
  hotConfig()
)();

/****
 * Hot Mods
 */
var babel = _.find(config.module.loaders, {name: "babel"});

// update babel loaders for hot loading
babel.loaders = [].concat(["react-hot"], babel.loaders);
babel.include = path.join(process.cwd(), "client");

module.exports = config;
