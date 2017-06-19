"use strict";

const ispartaLoader = require.resolve("isparta-loader");

module.exports = function() {
  return {
    module: {
      rules: [
        // Manually instrument client code for code coverage.
        // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
        {
          _name: "isparta",
          test: /(test|client)\/.*\.jsx?$/,
          enforce: "pre",
          exclude: /(node_modules|\bclient\/vendor\b)/,
          loader: ispartaLoader
        }
      ]
    }
  };
};
