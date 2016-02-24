"use strict";
/***
 * Webpack base configuration (XXX production build config)
 */
var path = require("path");
var _ = require("lodash");

// config partials
var babelConfig = require("./partial/babel");
var defineConfig = require("./partial/define");
var extractStylesConfig = require("./partial/extract");
var fontsConfig = require("./partial/fonts");
var imagesConfig = require("./partial/images");
var optimizeConfig = require("./partial/optimize");
var sourcemapsConfig = require("./partial/sourcemaps");
var statsConfig = require("./partial/stats");

// create module loaders factory
var createConfig = _.flowRight(
  babelConfig(),
  defineConfig(),
  extractStylesConfig(),
  fontsConfig(),
  imagesConfig(),
  optimizeConfig(),
  sourcemapsConfig(),
  statsConfig()
);

var archetypeNodeModules = path.join(__dirname, "../../node_modules");

// create config
var config = createConfig({
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
});

module.exports = config;
