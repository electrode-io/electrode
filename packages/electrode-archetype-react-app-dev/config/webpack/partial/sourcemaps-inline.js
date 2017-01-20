"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      devtool: "inline-source-map"
    });
  };
};
