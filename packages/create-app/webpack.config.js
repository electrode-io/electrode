"use strict";

const Path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const base = {
  mode: process.env.ANALYZE_BUNDLE ? "development" : "production",
  //devtool: "source-map",
  entry: {
    "index.js": Path.resolve("src/index.js")
  },
  plugins: [process.env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin()].filter(x => x),
  resolve: {
    symlinks: false, // don't resolve symlinks to their real path
    alias: {}
  },
  output: {
    filename: `[name]`,
    path: Path.resolve("dist"),
    libraryTarget: "commonjs2"
  },
  target: "node",
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: x => x.indexOf("node_modules") > 0,
        use: "babel-loader"
      }
    ]
  }
};

module.exports = base;
