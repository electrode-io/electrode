"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var optimize = require("webpack").optimize;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
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
