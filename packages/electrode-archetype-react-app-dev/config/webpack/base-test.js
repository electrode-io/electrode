"use strict";
var archetype = require("../archetype");
var mergeWebpackConfig = require("webpack-partial").default;
var Path = archetype.Path;

var baseConfig = require("./base.js");

var testConfig = {
  module: {
    /*
     * This prevents webpack from running its parsers on any sinon files. Sinon breaks when it is
     * `import`ed by a file or module such as enzyme or your spec files.
     * See here:
     * https://github.com/webpack/webpack/issues/304
     * https://github.com/sinonjs/sinon/pull/600#issuecomment-162529457
     */
    noParse: [
      /node_modules\/sinon\//
    ]
  },
  context: Path.resolve("test", "client"),
  // debug: false, // TODO: webpack 2.0 invalid
  devServer: {
    stats: "errors-only"  // only show errors
  },
  entry: require.resolve("../karma/entry"),
  output: {
    path: process.cwd(),
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  resolve: {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: process.cwd(),
      sinon: require.resolve("sinon/pkg/sinon")
    }
  },
  // Enzyme depends jsdom and cheerio being global to render their DOM.
  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/addons": true,
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
  }
};

module.exports = mergeWebpackConfig(baseConfig, testConfig);
