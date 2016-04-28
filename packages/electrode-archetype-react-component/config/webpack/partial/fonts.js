"use strict";

const mergeWebpackConfig = require("webpack-partial").default;

const urlLoader = require.resolve("url-loader");
const fileLoader = require.resolve("file-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "woff",
      test: /\.woff(2)?$/i,
      loader: urlLoader + "?limit=10000&mimetype=application/font-woff"
    }, {
      name: "fonts",
      test: /\.(ttf|eot)$/i,
      loader: fileLoader
    }]
  }
});
