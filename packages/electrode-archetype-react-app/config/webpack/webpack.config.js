"use strict";

var webpack = require("webpack");
var path = require("path");
var archetypeNodeModules = path.join(__dirname, "../../", "node_modules");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var autoprefixer = require("autoprefixer-stylus");

var babelLoader = require.resolve("babel-loader");
var styleLoader = require.resolve("style-loader");
var cssLoader = require.resolve("css-loader");
var stylusLoader = require.resolve("stylus-loader");
var urlLoader = require.resolve("url-loader");
var fileLoader = require.resolve("file-loader");

module.exports = {
  cache: true,
  context: path.join(process.cwd(), "client"),
  entry: "./app.jsx",
  output: {
    path: path.join(process.cwd(), "dist/js"),
    filename: "bundle.[hash].js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, include: path.join(process.cwd(), "client"),
        loader: babelLoader },
      { test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          styleLoader, cssLoader + "!" + stylusLoader) },
      { test: /\.woff(2)?$/,
        loader: urlLoader + "?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg|png)$/,
        loader: fileLoader }
    ]
  },
  stylus: {
    use: [autoprefixer({ browsers: ["last 2 versions"] })]
  },
  resolve: {
    root: [archetypeNodeModules, process.cwd()],
    modulesDirectories: ["node_modules", "client", "node_modules/@walmart"],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [archetypeNodeModules, process.cwd()]
  },
  plugins: [
    new ExtractTextPlugin("style.[hash].css"),
    // Optimize
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // Signal production mode for React JS libs.
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.SourceMapDevToolPlugin(
      "../map/bundle.[hash].js.map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
    ),
    new StatsWriterPlugin({
      filename: "../server/stats.json"
    }),
    new webpack.SourceMapDevToolPlugin("[file].map")
  ]
};
