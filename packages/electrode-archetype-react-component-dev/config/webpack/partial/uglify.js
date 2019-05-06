"use strict";

const optimize = require("webpack").optimize;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = function() {
  const uglifyOpts = {
    sourceMap: true,
    parallel: true,
    uglifyOptions: {
      warnings: false,
      compress: {
        unused: true,
        dead_code: true
      }
    }
  };

  return {
    optimization: {
      nodeEnv: "production",
      minimizer: [new UglifyJsPlugin(uglifyOpts)]
    },
    plugins: [new LodashModuleReplacementPlugin()]
  };
};
