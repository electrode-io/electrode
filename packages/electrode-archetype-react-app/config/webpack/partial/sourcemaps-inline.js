"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      devtool: "inline-source-map"
    });
  };
};
