"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var ispartaLoader = archDevRequire.resolve("isparta-loader");

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
