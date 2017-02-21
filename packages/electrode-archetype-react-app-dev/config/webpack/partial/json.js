"use strict";

var mergeWebpackConfig = require("webpack-partial").default;

module.exports = Object.defineProperties(function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [
          {
            name: "json",
            test: /\.json$/i,
            loader: "json"
          }
        ]
      }
    });
  };
}, {
  sequence: {
    value: 0
  }
});
