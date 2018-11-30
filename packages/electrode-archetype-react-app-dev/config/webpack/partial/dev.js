"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const archetype = require("electrode-archetype-react-app/config/archetype");
const webpackDevReporter = require("../util/webpack-dev-reporter");

const devProtocol = archetype.webpack.https ? "https://" : "http://";

module.exports = function() {
  const devServerConfig = {
    reporter: webpackDevReporter,
    https: Boolean(archetype.webpack.https)
  };

  if (process.env.WEBPACK_DEV_HOST || process.env.WEBPACK_HOST) {
    devServerConfig.public = `${archetype.webpack.devHostname}:${archetype.webpack.devPort}`;
    devServerConfig.headers = {
      "Access-Control-Allow-Origin": `${devProtocol}${archetype.webpack.devHostname}:${
        archetype.webpack.devPort
      }`
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
      new webpack.SourceMapDevToolPlugin({ filename: "[file].map" }),
      new ExtractTextPlugin({ filename: "[name].style.css" })
    ],
    optimization: {
      noEmitOnErrors: true
    }
  };

  return config;
};
