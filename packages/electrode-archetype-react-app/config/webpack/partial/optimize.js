"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var optimize = archDevRequire("webpack").optimize;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new optimize.DedupePlugin(),
        new optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
    });
  };
};
