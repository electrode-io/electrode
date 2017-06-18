"use strict";

const webpack = require("webpack");

module.exports = function() {
  return {
    cache: true,
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          debug: false
        }
      })
    ]
  };
};
