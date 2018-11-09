"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function() {
  return {
    cache: true,
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: false
      }),
      new ExtractTextPlugin({ filename: "[name].style.css" })
    ]
  };
};
