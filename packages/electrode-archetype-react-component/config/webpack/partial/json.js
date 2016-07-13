"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const jsonLoader = archDevRequire.resolve("json-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "json",
      test: /\.json$/,
      loader: jsonLoader
    }]
  }
});
