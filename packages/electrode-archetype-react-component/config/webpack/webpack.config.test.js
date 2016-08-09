"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");

var archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
var _ = archDevRequire("lodash");
var sinonPkg = archDevRequire.resolve("sinon/pkg/sinon");

var karmaEntry = require.resolve("@walmart/electrode-archetype-react-component/config/karma/entry");
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
  /node_modules\/sinon\//
];
// Get Paths to give node_modules by resolving based on assumed presence of
// `package.json`.
var _archNodeModules = function (arch) {
  var archDir = path.dirname(require.resolve(path.join(arch, "package.json")));
  return path.join(archDir, "node_modules");
};

module.exports = {
  cache: true,
  context: path.join(process.cwd(), "test/client"),
  entry: karmaEntry,
  output: {
    path: process.cwd(),
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  resolve: _.merge({}, prodCfg.resolve, {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: path.join(process.cwd(), "src"),
      sinon: sinonPkg
    },
    modulesDirectories: [
      "node_modules",
      _archNodeModules("@walmart/electrode-archetype-react-component"),
      _archNodeModules("@walmart/electrode-archetype-react-component-dev")
    ]
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
