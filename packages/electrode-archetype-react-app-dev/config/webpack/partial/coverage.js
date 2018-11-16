"use strict";

module.exports = function() {
  try {
    const iiLoader = require.resolve("electrode-archetype-opt-karma/lib/isparta-loader");

    return {
      module: {
        rules: [
          {
            _name: "isparta-loader",
            loader: iiLoader,
            test: /client\/.*\.jsx?$/,
            enforce: "pre",
            exclude: /(node_modules|\btest\/|\bclient\/vendor\b)/
          }
        ]
      }
    };
  } catch (e) {
    return {};
  }
};
