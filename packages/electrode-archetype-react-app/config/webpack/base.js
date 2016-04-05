"use strict";

var _ = require("lodash");
var path = require("path");
var mergeWebpackConfig = require("webpack-partial").default;

// config partials
var babelConfig = require("./partial/babel");
var extractStylesConfig = require("./partial/extract");
var fontsConfig = require("./partial/fonts");
var imagesConfig = require("./partial/images");
var statsConfig = require("./partial/stats");
var isomorphicConfig = require("./partial/isomorphic");

var archetypeNodeModules = path.join(__dirname, "../../node_modules");

var baseConfig = {
  cache: true,
  context: path.join(process.cwd(), "client"),
  debug: false,
  entry: "./app.jsx",
  output: {
    path: path.join(process.cwd(), "dist/js"),
    filename: "bundle.[hash].js"
  },
  resolve: {
    root: [archetypeNodeModules, process.cwd()],
    modulesDirectories: ["client", "node_modules", "node_modules/@walmart"],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [archetypeNodeModules, process.cwd()]
  }
};

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  babelConfig(),
  extractStylesConfig(),
  fontsConfig(),
  imagesConfig(),
  statsConfig(),
  isomorphicConfig()
)();
