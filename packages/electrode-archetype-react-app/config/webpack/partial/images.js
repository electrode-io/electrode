"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var cdnLoader = require.resolve("@walmart/cdn-file-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: cdnLoader + "?limit=10000!isomorphic"
        }]
      }
    });
  };
};
