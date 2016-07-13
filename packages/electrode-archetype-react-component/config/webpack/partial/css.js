"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const styleLoader = archDevRequire.resolve("style-loader");
const cssLoader = archDevRequire.resolve("css-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "css",
      test: /\.css$/,
      loader: styleLoader + "!" + cssLoader // eslint-disable-line prefer-template
    }]
  }
});
