"use strict";

var ispartaLoader = require.resolve("../loaders/isparta-loader");

module.exports = function() {
  return {
    module: {
      rules: [{
        test: /src\/.*\.jsx?$/,
        enforce: "pre",
        exclude: /(test|node_modules)\//,
        loader: ispartaLoader
      }]
    }
  };
};
