"use strict";

const archetype = require("../../archetype");
const IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");
const mergeWebpackConfig = require("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new IsomorphicLoaderPlugin({
          assetsFile: "../isomorphic-assets.json",
          webpackDev: {
            url: `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}`,
            addUrl: false
          }
        })
      ]
    });
  };
};
