"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const optimize = archDevRequire("webpack").optimize;
const LodashModuleReplacementPlugin = archDevRequire("lodash-webpack-plugin");

module.exports = () => (config) => mergeWebpackConfig(config, {
  plugins: [
    new LodashModuleReplacementPlugin(),
    new optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]
});
