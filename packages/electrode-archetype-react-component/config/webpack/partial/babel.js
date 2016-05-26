"use strict";

const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const babelLoader = archDevRequire.resolve("babel-loader");

module.exports = (babel) => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "babel",
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: babelLoader,
      // The babel-loader treats queries as babel config. E.g. `{ "presets": ["react"] }`
      query: babel
    }]
  }
});
