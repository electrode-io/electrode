"use strict";

const iiLoader = require.resolve("../loaders/isparta-loader");

module.exports = function() {
  return {
    module: {
      rules: [
        {
          _name: "isparta-loader",
          loader: iiLoader,
          test: /(test|client)\/.*\.jsx?$/,
          enforce: "pre",
          exclude: /(node_modules|\bclient\/vendor\b)/
        }
      ]
    }
  };
};
