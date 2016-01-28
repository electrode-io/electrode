"use strict";

var webpack = require("webpack");
var path = require("path");
var archetypeNodeModules = path.join(__dirname, "../../", "node_modules");

var babelLoader = require.resolve("babel-loader");
var jsonLoader = require.resolve("json-loader");
var styleLoader = require.resolve("style-loader");
var cssLoader = require.resolve("css-loader");
var stylusLoader = require.resolve("stylus-loader");
var urlLoader = require.resolve("url-loader");

module.exports = {
  cache: true,
  debug: false,
  devtool: "source-map",
  entry: path.join(process.cwd(), "index.js"),
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      loader: babelLoader
    }, {
      test: /\.json$/,
      loader: jsonLoader
    }, {
      test: /\.css$/,
      loader: styleLoader + "!" + cssLoader
    }, {
      test: /\.styl$/,
      loader: styleLoader + "!" + cssLoader + "?modules!" + stylusLoader
    }, {
      test: /\.(png|jpg|svg|gif)$/,
      loader: urlLoader
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.SourceMapDevToolPlugin("[file].map")
  ],
  resolve: {
    root: [archetypeNodeModules, process.cwd()],
    modulesDirectories: ["node_modules"],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [archetypeNodeModules, process.cwd()]
  }
};
