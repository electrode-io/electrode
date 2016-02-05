"use strict";

const mergeWebpackConfig = require("webpack-partial").default;

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "json",
      test: /\.json$/,
      loader: require.resolve("json-loader")
    }]
  }
});
