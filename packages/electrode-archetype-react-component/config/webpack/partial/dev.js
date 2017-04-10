"use strict";

var Path = require("path");
var archDevRequire = require("electrode-archetype-react-component-dev/require");
var webpack = archDevRequire("webpack");

module.exports = function() {
  return {
    devtool: "source-map",
    entry: {
      app: [Path.join(__dirname, "../../../demo-server/app.js")]
    },
    stats: {
      colors: true,
      reasons: true
    },
    devServer: {
      port: process.env.WEBPACK_DEVSERVER_PORT || "4000",
      contentBase: Path.join(__dirname, "../../../demo-server"),
      noInfo: false,
      historyApiFallback: true
    },
    output: {
      path: process.cwd(),
      filename: "bundle.dev.js",
      publicPath: "/js/"
    },
    resolve: {
      alias: {
        // Allow root import of `src/FOO` from ROOT/src.
        src: Path.join(process.cwd(), "src"),
        "local-component-demo": Path.join(process.cwd() + "/demo/demo.jsx"),
        // By default, this archetype assumes you are using CSS-Modules + CSS-Next
        "local-demo-css": Path.join(process.cwd() + "/demo/demo")
      }
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }
};
