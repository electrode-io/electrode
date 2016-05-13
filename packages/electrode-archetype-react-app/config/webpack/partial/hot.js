"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      devtool: "eval",
      entry: [
        "webpack-dev-server/client?http://dev.walmart.com:2992",
        "webpack/hot/only-dev-server",
        config.entry
      ]
    });
  };
};
