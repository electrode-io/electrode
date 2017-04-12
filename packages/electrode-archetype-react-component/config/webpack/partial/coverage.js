"use strict";

var ispartaLoader = archDevRequire.resolve("isparta-loader");

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
