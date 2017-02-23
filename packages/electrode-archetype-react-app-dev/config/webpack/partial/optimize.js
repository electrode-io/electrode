"use strict";

const mergeWebpackConfig = require("webpack-partial").default;
const optimize = require("webpack").optimize;
const _ = require("lodash");
const inspectpack = process.env.INSPECTPACK_DEBUG === "true";

// var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins:
      // Allow env var to disable minifcation for inspectpack usage.
      inspectpack ? [] : [
        new optimize.UglifyJsPlugin(_.merge(
          {
            sourceMap: true,
            compress: {
              warnings: false
            }
          },
          process.env.OPTIMIZE_STATS === "true" && {
            comments: /^\**!|^ [0-9]+ $|@preserve|@license/
          }))
      ]
    });
  };
};
