"use strict";

const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;

module.exports = (babel) => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "babel",
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: archDevRequire.resolve("babel-loader"),
      // The babel-loader treats queries as babel config. E.g. `{ "presets": ["react"] }`
      query: babel
    }]
  }
});
