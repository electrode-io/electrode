"use strict";

var _ = require("lodash");
var fs = require("fs");
var mergeWebpackConfig = require("webpack-partial").default;

// config partials
var babelConfig = require("./partial/babel");
var extractStylesConfig = require("./partial/extract");
var fontsConfig = require("./partial/fonts");
var imagesConfig = require("./partial/images");
var statsConfig = require("./partial/stats");
var isomorphicConfig = require("./partial/isomorphic");
var jsonConfig = require("./partial/json");
var pwaConfig = require("./partial/pwa");
var archetype = require("../archetype");
var Path = archetype.Path;
var AppMode = archetype.AppMode;
var context = Path.resolve(AppMode.src.client);

var archetypeNodeModules = Path.join(archetype.dir, "node_modules");
var archetypeDevNodeModules = Path.join(archetype.devDir, "node_modules");
var inspectpack = process.env.INSPECTPACK_DEBUG === "true";

/* eslint-disable func-style */

/*
 * Allow an application to opt in for *multiple* entry points and consequently for
 * multiple bundles in the app by placing `bundle.config.js` in application root
 * directory.
 *
 * If you need to set something like __webpack_public_path__, then your entry file
 * must be vanilla JS because webpack can only process those, so support having a
 * vanilla JS file as entry.
 */
function appEntry() {
  var entryPath = Path.join(context, "entry.config.js");

  /* eslint-disable no-console, global-require */
  try {
    return require(entryPath);
  } catch (ex) {
    console.log("Entry point configuration is not found, using default entry point...");
  }
  /* eslint-enable no-console, global-require */

  return fs.existsSync(Path.join(context, "app.js")) ? "./app.js" : "./app.jsx";
}

function getArchetypeConfig() {
  var archetypeConfigPath = Path.join(process.cwd(), "archetype", "config.js");
  var archetypeConfig;

  try {
    archetypeConfig = require(archetypeConfigPath);
  } catch (err) {
    archetypeConfig = {};
  }

  return archetypeConfig;
}

var entry = appEntry();
var multiBundle = _.isObject(entry);

var baseConfig = {
  __wmlMultiBundle: multiBundle,
  __archetypeConfig: getArchetypeConfig(),
  cache: true,
  context: context,
  debug: false,
  entry: entry,
  output: {
    path: Path.resolve("dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: "[hash].[name].js",
    filename: multiBundle
      ? "[name].bundle.[hash].js"
      : "bundle.[hash].js"
  },
  resolve: {
    root: [
      archetypeNodeModules,
      archetypeDevNodeModules,
      AppMode.isSrc && Path.resolve(AppMode.src.dir) || null,
      process.cwd()
    ].filter((x) => x),
    modulesDirectories: ["node_modules"].concat(archetype.webpack.modulesDirectories),
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [
      archetypeNodeModules,
      archetypeDevNodeModules,
      Path.resolve("lib"),
      process.cwd()
    ].filter((x) => x)
  }
};

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  babelConfig(),
  extractStylesConfig(),
  fontsConfig(),
  imagesConfig(),
  statsConfig(),
  isomorphicConfig(),
  jsonConfig(),
  pwaConfig()
)();
