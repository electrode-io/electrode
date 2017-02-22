"use strict";

const _ = require("lodash");
const webpack = require("webpack");
const WebpackConfig = require("webpack-config").default;
const removeDllReferences = require("./remove-dll-references");
const getRootConfig = require("./get-root-config");
const archetype = require("../archetype");
const Path = archetype.Path;
const AppMode = archetype.AppMode;
const clientDllConfig = require(Path.resolve(AppMode.src.client, "dll.config.js"));

const extensions = {};
const baseConfigPath = require.resolve("./webpack.config");

extensions[baseConfigPath] = function (config) {
  const statsPlugin = _.find(config.plugins, {
    opts: {
      filename: "../server/stats.json"
    }
  });
  const isomorphicPlugin = _.find(config.plugins, {
    options: {
      assetsFile: "../isomorphic-assets.json"
    }
  });

  statsPlugin.opts.filename = "../../dll/server/stats.dll.json";
  isomorphicPlugin.options.assetsFile = "../../dll/isomorphic-assets.dll.json";
  config.entry = {};

  return config;
};

const dllConfig = new WebpackConfig().extend(extensions).merge({
  entry: clientDllConfig,
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
