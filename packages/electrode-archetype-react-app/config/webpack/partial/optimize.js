"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var optimize = require("webpack").optimize;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        // XXX DedupePlugin causes webpack build errors in Collections App
        //   * https://jira.walmart.com/browse/GPRDT-196
        //new optimize.DedupePlugin(),
        new optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
    });
  };
};

