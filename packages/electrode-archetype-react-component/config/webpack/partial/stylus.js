"use strict";

const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const styleLoader = archDevRequire.resolve("style-loader");
const cssLoader = archDevRequire.resolve("css-loader");
const stylusLoader = archDevRequire.resolve("stylus-relative-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "stylus",
      test: /\.styl$/,
      /* eslint-disable prefer-template */
      loader: styleLoader + "!" + cssLoader + "!" + stylusLoader
      /* eslint-enable prefer-template */
    }]
  }
});
