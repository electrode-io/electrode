"use strict";

var archetype = require("../../archetype");
var IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

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
