"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var optimize = require("webpack").optimize;

var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new LodashModuleReplacementPlugin(),
        new optimize.DedupePlugin(),
        new optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
    });
  };
};
