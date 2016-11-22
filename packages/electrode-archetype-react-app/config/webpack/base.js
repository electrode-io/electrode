"use strict";

var _ = require("lodash");
var fs = require("fs");
var archetype = require("../archetype");
var Path = archetype.PlatformPath;
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

// config partials
var babelConfig = require("./partial/babel");
var extractStylesConfig = require("./partial/extract");
var fontsConfig = require("./partial/fonts");
var imagesConfig = require("./partial/images");
var statsConfig = require("./partial/stats");
var isomorphicConfig = require("./partial/isomorphic");
var pwaConfig = require('./partial/pwa');

var archetypeNodeModules = Path.join(__dirname, "../../node_modules");
var archetypeDevNodeModules = Path.join(archetype.devPath, "node_modules");
var inspectpack = process.env.INSPECTPACK_DEBUG === "true";

var context = Path.resolve(archetype.clientSrcDir);

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

var entry = appEntry();
var multiBundle = _.isObject(entry);

var baseConfig = {
  __wmlMultiBundle: multiBundle,
  cache: true,
  context: context,
  debug: false,
  entry: entry,
  output: {
    path: Path.resolve("dist/js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: "[hash].[name].js",
    filename: multiBundle
      ? "[name].bundle.[hash].js"
      : "bundle.[hash].js"
  },
  resolve: {
    root: [archetypeNodeModules, archetypeDevNodeModules, process.cwd()],
    modulesDirectories: ["client", "node_modules"].concat(archetype.webpack.modulesDirectories),
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [archetypeNodeModules, archetypeDevNodeModules, process.cwd()]
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
  pwaConfig()
)();
