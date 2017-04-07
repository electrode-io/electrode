"use strict";

var archDevRequire = require("electrode-archetype-react-component-dev/require");
var webpack = archDevRequire("webpack");
var _ = archDevRequire("lodash");
var Path = require("path");

module.exports = function() {
  return {
    entry: {
      app: [
        "webpack-dev-server/client?http://0.0.0.0:" +
          (process.env.WEBPACK_DEVSERVER_PORT || "4000"), // WebpackDevServer host and port
        "webpack/hot/only-dev-server",
        "./demo/demo.jsx",
        Path.join(process.cwd(), "src/index.js")
      ]
    },
    devServer: {
      port: process.env.WEBPACK_DEVSERVER_PORT || "4000",
      contentBase: Path.join(__dirname, "../../../demo-server"),
      noInfo: false,
      historyApiFallback: true,
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
