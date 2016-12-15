"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const urlLoader = archDevRequire.resolve("url-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "images",
      test: /\.(png|jpg|svg|gif)$/,
      loader: urlLoader
    }]
  }
});
