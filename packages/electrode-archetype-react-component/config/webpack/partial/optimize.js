"use strict";

const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const optimize = archDevRequire("webpack").optimize;

const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = () => (config) => mergeWebpackConfig(config, {
  plugins: [
    new LodashModuleReplacementPlugin(),
    new optimize.DedupePlugin(),
    new optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});
