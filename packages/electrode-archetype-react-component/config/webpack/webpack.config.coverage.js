"use strict";

/**
 * Webpack frontend test (w/ coverage) configuration.
 */
var archDevRequire = require("electrode-archetype-react-component-dev/require");
var _ = archDevRequire("lodash");
var ispartaLoader = archDevRequire.resolve("isparta-loader");


var testCfg = require("./webpack.config.test");

module.exports = _.merge({}, testCfg, {
  module: {
    rules: [{
      test: /src\/.*\.jsx?$/,
      enforce: "pre"
      exclude: /(test|node_modules)\//,
      loader: ispartaLoader
    }]
  }
});
