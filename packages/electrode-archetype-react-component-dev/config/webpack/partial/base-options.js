"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function() {
  return {
    cache: true,
    plugins: [new ExtractTextPlugin({ filename: "[name].style.css" })]
  };
};
