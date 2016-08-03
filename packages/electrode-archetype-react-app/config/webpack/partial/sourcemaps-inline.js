"use strict";

var archetype = require("../../archtype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      devtool: "inline-source-map"
    });
  };
};
