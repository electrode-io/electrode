"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

module.exports = function (babel) {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "babel",
          test: /\.jsx?$/,
          exclude: /(node_modules|\bclient\/vendor\b)/,
          // NOTE: webpack.config.hot.js inserts "react-hot" into loaders array
          loader: archetype.devRequire.resolve("babel-loader"),
          query: babel
        }]
      }
    });
  };
};
