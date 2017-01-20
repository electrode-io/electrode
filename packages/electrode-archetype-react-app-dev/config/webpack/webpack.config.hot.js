"use strict";
/**
 * Webpack hot configuration
 */
var _ = require("lodash");
var path = require("path");
var mergeWebpackConfig = require("webpack-partial").default;
var hotConfig = require("./partial/hot");
var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var devConfig = require("./partial/dev.js");
var WebpackConfig = require("webpack-config").default;
var getRootConfig = require("./get-root-config");
var fs = require("fs");
var archetype = require("../archetype");

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
babel.include = path.resolve(archetype.AppMode.src.client);

module.exports = new WebpackConfig().merge(config).merge(getRootConfig("webpack.config.hot.js"));
