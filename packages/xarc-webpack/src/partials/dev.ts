/* eslint-disable @typescript-eslint/no-var-requires */

import * as Url from "url";
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackDevReporter = require("../util/webpack-dev-reporter");
import { loadXarcOptions } from "../util/load-xarc-options";

const HTTP_PORT = 80;

module.exports = function() {
  const xarcOptions = loadXarcOptions();

  const devProtocol = xarcOptions.webpack.https ? "https://" : "http://";

  const devServerConfig: any = {
    hot: xarcOptions.webpack.enableHotModuleReload,
    overlay: {
      errors: true,
      warnings: xarcOptions.webpack.enableWarningsOverlay
    },
    reporter: webpackDevReporter,
    https: Boolean(xarcOptions.webpack.https)
  };

  if (process.env.WEBPACK_DEV_HOST || process.env.WEBPACK_HOST) {
    devServerConfig.public = `${xarcOptions.webpack.devHostname}:${xarcOptions.webpack.devPort}`;
    const orginUrl = `${devProtocol}${xarcOptions.webpack.devHostname}:${xarcOptions.webpack.devPort}`;
    devServerConfig.headers = {
      "Access-Control-Allow-Origin": orginUrl
    };
  } else {
    devServerConfig.disableHostCheck = true;
    devServerConfig.headers = {
      "Access-Control-Allow-Origin": "*"
    };
  }

  //
  // The publicPath here is for mapping assets that are collected
  // during webpack compile through the isomorphic-loader plugin.
  // Elsewhere in electrode-react-webapp, it detects webpack dev
  // mode and construct the CSS/JS bundle URLs separately.
  //
  const makePublicPath = () => {
    // is any of the webpack.cdn* options defined
    const { cdnProtocol, cdnHostname, cdnPort } = xarcOptions.webpack;
    if (cdnProtocol !== null || cdnHostname !== null || cdnPort !== 0) {
      return Url.format({
        protocol: cdnProtocol || "http",
        hostname: cdnHostname || "localhost",
        port: cdnPort !== HTTP_PORT ? cdnPort : "",
        pathname: "/js/"
      });
    } else if (process.env.APP_SERVER_PORT) {
      // we running with a reverse proxy that join app and webpack dev
      // under the same host and port, so use a relative path
      return "/js/";
    } else {
      const { https, devHostname, devPort } = xarcOptions.webpack;
      // original dev assets URLs
      return Url.format({
        protocol: https ? "https" : "http",
        hostname: devHostname,
        port: devPort,
        pathname: "/js/"
      });
    }
  };

  const { namespace } = xarcOptions;
  const nsTag = namespace ? `${namespace}.` : ``;

  const config = {
    devServer: devServerConfig,
    output: {
      publicPath: makePublicPath(),
      filename: `${nsTag}[name].bundle.dev.js`,
      chunkFilename: `${nsTag}[name].bundle.dev.js`
    },
    devtool: "inline-source-map",
    // TODO: why is this here and duplicates what's in extract-style partial?  This is causing
    // duplicate CSS bundles to be generated in dev mode.
    // Comment out for now
    // plugins: [new MiniCssExtractPlugin({ filename: "[name].style.css" })],
    optimization: {
      noEmitOnErrors: true
    }
  };

  return config;
};
