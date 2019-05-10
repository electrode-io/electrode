"use strict";

const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin-legacy");

const isProduction = process.env.NODE_ENV === "production";

module.exports = function() {
  const plugins = [new LodashModuleReplacementPlugin()];

  if (process.env.NODE_ENV === "production") {
    return {
      plugins: [
        ...plugins,
        new TerserPlugin({
          test: /\.js(\?.*)?$/i
        })
      ]
    };
  } else {
    return {
      plugins: [...plugins]
    };
  }
};
