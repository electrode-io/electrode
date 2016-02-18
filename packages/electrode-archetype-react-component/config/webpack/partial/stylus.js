"use strict";

const mergeWebpackConfig = require("webpack-partial").default;

const styleLoader = require.resolve("style-loader");
const cssLoader = require.resolve("css-loader");
const stylusLoader = require.resolve("stylus-loader");

const cssModuleSupport = process.env.npm_package_config_electrode_archetype_react_component_webpack_css_modules === "true" ? // eslint-disable-line max-len
  "?modules" :
  "";

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "stylus",
      test: /\.styl$/,
      /* eslint-disable prefer-template */
      loader: styleLoader + "!" + cssLoader + cssModuleSupport + "!" + stylusLoader
      /* eslint-enable prefer-template */
    }]
  }
});
