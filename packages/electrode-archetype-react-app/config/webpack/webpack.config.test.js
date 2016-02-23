"use strict";
/***
 * Webpack frontend test configuration.
 */
var path = require("path");
var _ = require("lodash");
var prodCfg = require("./webpack.config");

/*
 * This prevents webpack from running its
 * parsers on any sinon files. Sinon breaks
 * when it is `import`ed by a file or module.
 * Such as enzyme or your spec files.
 * See here:
 * https://github.com/webpack/webpack/issues/304
 * https://github.com/sinonjs/sinon/pull/600#issuecomment-162529457
 */
prodCfg.module.noParse = [
  /node_modules\/sinon\//,
  /test\/server\//
];


module.exports = {
  cache: true,
  context: path.join(process.cwd(), "test/client"),
  devServer: {
    stats: "errors-only"  // only show errors
  },
  entry: require.resolve("@walmart/electrode-archetype-react-app/config/karma/entry"),
  output: {
    path: process.cwd(),
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  resolve: _.merge({}, prodCfg.resolve, {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: process.cwd(),
      sinon: require.resolve("sinon/pkg/sinon")
    }
  }),
  // Enzyme depends jsdom and cheerio being global to render their DOM.
  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
  },
  resolveLoader: prodCfg.resolveLoader,
  module: prodCfg.module,
  devtool: "source-map"
};
