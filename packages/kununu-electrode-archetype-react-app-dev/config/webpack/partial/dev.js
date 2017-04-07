"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const archetype = require("kununu-electrode-archetype-react-app/config/archetype");
const webpackDevReporter = require("../util/webpack-dev-reporter");

const devProtocol = Boolean(process.env.WEBPACK_DEV_HTTPS) ? 'https://' : 'http://';

module.exports = function () {
  const config = {
    devServer: {
      reporter: webpackDevReporter,
      https: Boolean(process.env.WEBPACK_DEV_HTTPS) || false
    },
    output: {
      publicPath: `${devProtocol}${archetype.webpack.devHostname}:${archetype.webpack.devPort}/js/`,
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
