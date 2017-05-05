"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const archetype = require("electrode-archetype-react-app/config/archetype");
const webpackDevReporter = require("../util/webpack-dev-reporter");

const devProtocol = process.env.WEBPACK_DEV_HTTPS ? "https://" : "http://";

module.exports = function () {
  const devServerConfig = {
    reporter: webpackDevReporter,
    https: Boolean(process.env.WEBPACK_DEV_HTTPS)
  };
  
  if (process.env.WEBPACK_HOST) {
    devServerConfig.host = process.env.WEBPACK_HOST;
    devServerConfig.headers = {
      "Access-Control-Allow-Origin": `${devProtocol}${process.env.WEBPACK_HOST}`
    };
  } else {
    devServerConfig.disableHostCheck = true;
    devServerConfig.headers = {
      "Access-Control-Allow-Origin": "*"
    };
  }

  const config = {
    devServer: devServerConfig,
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
