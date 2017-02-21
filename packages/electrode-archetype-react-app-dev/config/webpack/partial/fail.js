"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var FailPlugin = require("../plugins/fail-plugin");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        FailPlugin
      ]
    });
  };
};
