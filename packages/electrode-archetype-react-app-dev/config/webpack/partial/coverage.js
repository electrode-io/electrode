"use strict";

var ispartaLoader = archetype.devRequire.resolve("isparta-loader");
var mergeWebpackConfig = require("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        preLoaders: [
          // Manually instrument client code for code coverage.
          // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
          {
            test: /(test|client)\/.*\.jsx?$/,
            exclude: /(node_modules|\bclient\/vendor\b)/,
            loader: ispartaLoader
          }
        ]
      }
    });
  };
};
