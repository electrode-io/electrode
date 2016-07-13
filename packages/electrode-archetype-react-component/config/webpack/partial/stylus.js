"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const styleLoader = archDevRequire.resolve("style-loader");
const cssLoader = archDevRequire.resolve("css-loader");
const stylusLoader = archDevRequire.resolve("stylus-relative-loader");

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
