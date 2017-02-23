"use strict";

const mergeWebpackConfig = require("webpack-partial").default;
const archetype = require("../../archetype");
const AppMode = archetype.AppMode;
const Path = archetype.Path;
const _ = require("lodash");

module.exports = function (babel) {
  // regex \b for word boundaries
  const babelExcludeRegex = new RegExp(`(node_modules|\\b${Path.join(AppMode.src.client, "vendor")}\\b)`);
  return function (config) {
    const hmr = process.env.HMR !== undefined;
    const babelLoader = {
      test: /\.jsx?$/,
      exclude: babelExcludeRegex,
      use: [
        hmr && "react-hot-loader",
        {
          loader: "babel-loader",
          options: babel
        }
      ].filter(_.identity)
    };
    if (hmr) {
      babelLoader.include = Path.resolve(AppMode.src.client);
    }
    return mergeWebpackConfig(config, {
      module: {
        rules: [_.assign({}, babelLoader, archetype.webpack.extendBabelLoader)]
      }
    });
  };
};
