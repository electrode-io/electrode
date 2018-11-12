"use strict";

const babelLoader = require.resolve("babel-loader");

module.exports = function(options) {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: babelLoader,
          // The babel-loader treats queries as babel config. E.g. `{ "presets": ["react"] }`
          query: options.babel
        }
      ]
    }
  };
};
