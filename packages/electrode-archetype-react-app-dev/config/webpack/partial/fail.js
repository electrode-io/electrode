"use strict";

const mergeWebpackConfig = require("webpack-partial").default;
const FailPlugin = require("../plugins/fail-plugin");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        FailPlugin
      ]
    });
  };
};
