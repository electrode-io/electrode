"use strict";
/***
 * Webpack frontend test configuration.
 */
var path = require("path");

var _ = require("lodash");

var baseConfig = require("./webpack.config");

var config = _.assign({}, baseConfig, {
  context: path.join(process.cwd(), "test/client"),
  devtool: "source-map",
  entry: require.resolve("@walmart/electrode-archetype-react-app/config/karma/entry"),
  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
  },
  output: {
    path: process.cwd(),
    filename: "bundle.js",
    publicPath: "/assets/"
  }
});

// maintain and augment `base.resolve` and `base.module`
config.resolve.alias = {
  // Allow root import of `src/FOO` from ROOT/src.
  src: path.join(process.cwd(), "src"),
  sinon: require.resolve("sinon/pkg/sinon")
};

/***
 * This prevents webpack from running its
 * parsers on any sinon files. Sinon breaks
 * when it is `import`ed by a file or module.
 * Such as enzyme or your spec files.
 * See here:
 * https://github.com/webpack/webpack/issues/304
 * https://github.com/sinonjs/sinon/pull/600#issuecomment-162529457
 */
config.module.noParse = [
  /node_modules\/sinon\//
];

module.exports = config;

