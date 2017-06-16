"use strict";

const optimize = require("webpack").optimize;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = function() {
  return {
    plugins: [
      new LodashModuleReplacementPlugin(),
      new optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      })
    ]
  };
};
