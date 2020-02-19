"use strict";

const Path = require("path");
const webpack = require("webpack");

module.exports = function() {
  return {
    plugins: [
      new webpack.DllPlugin({
        name: "[name]_[hash]",
        path: Path.resolve("dll/js/[name]-manifest.[hash].json")
      })
    ]
  };
};
