"use strict";

const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const atImport = archDevRequire("postcss-import");
const cssnext = archDevRequire("postcss-cssnext");
const styleLoader = archDevRequire.resolve("style-loader");
const cssLoader = archDevRequire.resolve("css-loader");
const postcssLoader = archDevRequire.resolve("postcss-loader");

const cssModuleSupport = process.env.npm_package_config_electrode_archetype_react_component_webpack_css_modules === "true" ? // eslint-disable-line max-len
  "?modules!" + postcssLoader :
  "";

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "css",
      test: /\.css$/,
      /* eslint-disable prefer-template */
      loader: styleLoader + "!" + cssLoader + cssModuleSupport
      /* eslint-enable prefer-template */
    }]
  },
  postcss: function () {
    return cssModuleSupport ? [atImport, cssnext] : [];
  }
});
