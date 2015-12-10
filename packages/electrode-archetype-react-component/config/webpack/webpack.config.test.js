"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");
var _ = require("lodash");
var prodCfg = require("./webpack.config");

module.exports = {
  cache: true,
  context: path.join(process.cwd(), "test/client"),
  entry: require.resolve("@walmart/electrode-archetype-react-component/config/karma/entry"),
  output: {
    path: process.cwd(),
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  resolve: _.merge({}, prodCfg.resolve, {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: path.join(process.cwd(), "src"),
      sinon: "sinon/pkg/sinon"
    }
  }),
  externals: {
    jsdom: "window",
    cheerio: "window",
    react/lib/ExecutionEnvironment: true
  },
  resolveLoader: prodCfg.resolveLoader,
  module: prodCfg.module,
  devtool: "source-map"
};
