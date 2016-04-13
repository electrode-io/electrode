"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var ContextReplacementPlugin = require("webpack").ContextReplacementPlugin;

var LOCALES = ["en"]; // TODO: Finalize list of supported locales.
var LOCALES_REGEX = new RegExp("^\./(" + LOCALES.join("|") + ")$");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new ContextReplacementPlugin(/moment[\\\/]locale$/, LOCALES_REGEX)
      ]
    });
  };
};
