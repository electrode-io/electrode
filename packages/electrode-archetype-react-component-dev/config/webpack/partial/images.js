"use strict";

const urlLoader = require.resolve("url-loader");

module.exports = function() {
  return {
    module: {
      rules: [{
        test: /\.(png|jpg|svg|gif)$/,
        loader: urlLoader
      }]
    }
  }
};
