"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var DefinePlugin = archetype.devRequire("webpack").DefinePlugin;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new DefinePlugin({
          // Signal production, so that webpack removes
          // non-production code that is in conditionals
          // like: `if (process.env.NODE_ENV === "production")`
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
        })
      ]
    });
  };
};

