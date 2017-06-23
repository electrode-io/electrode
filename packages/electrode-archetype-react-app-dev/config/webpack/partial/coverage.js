"use strict";

const iiLoader = require.resolve("../loaders/istanbul-instrument-loader");
process.traceDeprecation = true;

module.exports = function() {
  return {
    module: {
      rules: [
        {
          _name: "istanbul-instrument-loader",
          loader: iiLoader,
          test: /(test|client)\/.*\.jsx?$/,
          enforce: "pre",
          exclude: /(node_modules|\bclient\/vendor\b)/,
          query: "esModules=true"
        }
      ]
    }
  };
};
