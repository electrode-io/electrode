"use strict";
/**
 * Webpack hot configuration
 */
var path = require("path");
var base = require("./webpack.config.dev");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  cache: true,
  context: base.context,
  entry: [
    "webpack-dev-server/client?http://127.0.0.1:2992",
    "webpack/hot/only-dev-server",
    base.entry
  ],
  output: base.output,
  module: {
    // Copy this because of `react-hot` injection.
    loaders: [
      { test: /\.js(x|)?$/, include: path.join(process.cwd(), "client"),
        loaders: ["react-hot", "babel-loader"] },
      { test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          "style-loader", "css-loader!stylus-loader") },
      { test: /\.woff(2)?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg|png)$/,
        loader: "file-loader" }
    ]
  },
  stylus: base.stylus,
  resolve: base.resolve,
  resolveLoader: base.resolveLoader,
  devtool: "source-map",
  plugins: base.plugins
};
