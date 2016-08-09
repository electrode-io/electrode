"use strict";

var archetype = require("../../archtype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: "isomorphic"
        }]
      }
    });
  };
};
