"use strict";

/**
 * Webpack frontend test (w/ coverage) configuration.
 */
var _ = require("lodash");
var testCfg = require("./webpack.config.test");

var ispartaLoader = require.resolve("isparta-loader");

module.exports = _.merge({}, testCfg, {
  module: {
    preLoaders: [
      // Manually instrument client code for code coverage.
      // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
      {
        test: /(test|client)\/.*\.jsx?$/,
        exclude: /node_modules\//,
        loader: ispartaLoader
      }
    ]
  }
});
