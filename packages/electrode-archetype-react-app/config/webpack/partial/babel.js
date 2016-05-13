"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;

module.exports = function (babel) {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "babel",
          test: /\.jsx?$/,
          exclude: /(node_modules|\bclient\/vendor\b)/,
          // NOTE: webpack.config.hot.js inserts "react-hot" into loaders array
          loader: archDevRequire.resolve("babel-loader"),
          query: babel
        }]
      }
    });
  };
};
