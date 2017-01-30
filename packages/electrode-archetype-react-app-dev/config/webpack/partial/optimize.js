"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = require("webpack-partial").default;
var optimize = require("webpack").optimize;
var _ = require("lodash");
var inspectpack = process.env.INSPECTPACK_DEBUG === "true";

// var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new optimize.DedupePlugin()
      ].concat(
        // Allow env var to disable minifcation for inspectpack usage.
        inspectpack ? [] : [
          new optimize.UglifyJsPlugin(_.merge(
            {
              compress: {
                warnings: false
              }
            },
            process.env.OPTIMIZE_STATS === "true" && {
              comments: /^\**!|^ [0-9]+ $|@preserve|@license/
            }))
        ]
      )
    });
  };
};
