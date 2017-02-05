"use strict";

var _ = require("lodash");
var webpack = require("webpack");
var WebpackConfig = require("webpack-config").default;
var removeDllReferences = require("./remove-dll-references");
var getRootConfig = require("./get-root-config");
var archetype = require("../archetype");
var Path = archetype.Path;
var AppMode = archetype.AppMode;
var optionalRequire = require("optional-require")(require);

/* eslint-disable func-style */

var extensions = {};
var baseConfigPath = require.resolve("./webpack.config");

extensions[baseConfigPath] = function (config) {
  var statsPlugin = _.find(config.plugins, {
    opts: {
      filename: "../server/stats.json"
    }
  });
  var isomorphicPlugin = _.find(config.plugins, {
    options: {
      assetsFile: "../isomorphic-assets.json"
    }
  });

  statsPlugin.opts.filename = "../../dll/server/stats.dll.json";
  isomorphicPlugin.options.assetsFile = "../../dll/isomorphic-assets.dll.json";
  config.entry = {};

  return config;
};

var dllConfig = new WebpackConfig().extend(extensions).merge({
  entry: optionalRequire(Path.resolve(AppMode.src.client, "dll.config.js")) || {},
  output: {
    path: Path.resolve("dll/js"),
    filename: "[name].bundle.[hash].js",
    library: "[name]_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[hash]",
      path: Path.resolve("dll/js/[name]-manifest.[hash].json")
    })
  ]
}).merge(getRootConfig("webpack.config.dll.js"));

removeDllReferences(dllConfig);

module.exports = dllConfig;
