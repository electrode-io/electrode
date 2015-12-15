/*globals __dirname:false */
"use strict";

var webpack = require("webpack");
var path = require("path");
var base = require("./webpack.config");

var _ = require("lodash");

module.exports = {
  devServer: {
    port: process.env.WEBPACK_DEVSERVER_PORT || "4000",
    contentBase: path.join(process.cwd(), "demo"),
    noInfo: false
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
