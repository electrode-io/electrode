"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var optimize = archDevRequire("webpack").optimize;

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
