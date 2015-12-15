"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");
var _ = require("lodash");
var prodCfg = require("./webpack.config");

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
      sinon: require.resolve("sinon/pkg/sinon")
    },
    modulesDirectories: [
      "node_modules",
      _archNodeModules("@walmart/electrode-archetype-react-component"),
      _archNodeModules("@walmart/electrode-archetype-react-component-dev")
    ]
  }),
  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true
  },
  resolveLoader: prodCfg.resolveLoader,
  module: prodCfg.module,
  devtool: "source-map"
};
