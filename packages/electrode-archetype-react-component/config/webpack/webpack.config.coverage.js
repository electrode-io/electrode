"use strict";

/**
 * Webpack frontend test (w/ coverage) configuration.
 */
var archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
var _ = archDevRequire("lodash");
var ispartaLoader = archDevRequire.resolve("isparta-loader");


var testCfg = require("./webpack.config.test");

module.exports = _.merge({}, testCfg, {
  module: {
    preLoaders: [
      // Manually instrument client code for code coverage.
      // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
      {
        test: /src\/.*\.jsx?$/,
        exclude: /(test|node_modules)\//,
        loader: ispartaLoader
      }
    ]
  }
});
