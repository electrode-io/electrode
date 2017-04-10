"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const babelLoader = archDevRequire.resolve("babel-loader");

module.exports = function(options) {
  return {
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: options.HotModuleReload ? ["react-hot-loader", babelLoader] : babelLoader,
        // The babel-loader treats queries as babel config. E.g. `{ "presets": ["react"] }`
        query: options.babel
      }]
    }
  };
};
