/*globals __dirname:false */

const webpack = require("webpack");
const path = require("path");
const base = require("./webpack.config");

const _ = require("lodash");

module.exports = {
  devServer: {
    port: process.env.WEBPACK_DEVSERVER_PORT || "4000",
    contentBase: path.join(process.cwd(), "demo"),
    noInfo: false,
    historyApiFallback: true
  },
  output: {
    path: process.cwd(),
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  cache: true,
  devtool: "source-map",
  entry: {
    app: ["./demo/demo.jsx"]
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: _.merge({}, base.resolve, {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: path.join(process.cwd(), "src")
    }
  }),
  resolveLoader: base.resolveLoader,
  module: base.module,
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
