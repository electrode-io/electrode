"use strict";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const archetype = require("electrode-archetype-react-app/config/archetype");
const webpackDevReporter = require("../util/webpack-dev-reporter");

const devProtocol = archetype.webpack.https ? "https://" : "http://";

module.exports = function() {
  const devServerConfig = {
    hot: archetype.webpack.enableHotModuleReload,
    overlay: {
      errors: true,
      warnings: archetype.webpack.enableWarningsOverlay
    },
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
    devtool: "inline-source-map",
    plugins: [new MiniCssExtractPlugin({ filename: "[name].style.css" })],
    optimization: {
      noEmitOnErrors: true
    }
  };

  return config;
};
