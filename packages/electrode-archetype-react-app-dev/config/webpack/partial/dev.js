"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const archetype = require("electrode-archetype-react-app/config/archetype");
const webpackDevReporter = require("../util/webpack-dev-reporter");

module.exports = function () {
  const config = {
    devServer: {
      reporter: webpackDevReporter
    },
    output: {
      publicPath: `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}/js/`,
      filename: "[name].bundle.dev.js"
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin("[file].map"),
      new ExtractTextPlugin({ filename: "[name].style.css" }),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  };

  return config;
};
