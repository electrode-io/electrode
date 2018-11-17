"use strict";

module.exports = function() {
  try {
    const ispartaLoader = require.resolve("electrode-archetype-opt-karma/loaders/isparta-loader");

    return {
      module: {
        rules: [
          {
            test: /src\/.*\.jsx?$/,
            enforce: "pre",
            exclude: /(test|node_modules)\//,
            loader: ispartaLoader
          }
        ]
      }
    };
  } catch (e) {
    return {};
  }
};
