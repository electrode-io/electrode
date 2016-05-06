"use strict";

const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "json",
      test: /\.json$/,
      loader: archDevRequire.resolve("json-loader")
    }]
  }
});
