"use strict";

var mergeWebpackConfig = require("webpack-partial").default;

module.exports = function (babel) {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "babel",
          test: /\.jsx?$/,
          exclude: /node_modules/,
          // NOTE: webpack.config.hot.js inserts "react-hot" into loaders array
          loaders: [require.resolve("babel-loader")],
          query: babel
        }]
      }
    });
  };
};

