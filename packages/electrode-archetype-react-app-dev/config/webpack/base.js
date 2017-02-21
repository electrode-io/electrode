"use strict";

var _ = require("lodash");
var fs = require("fs");
var mergeWebpackConfig = require("webpack-partial").default;
var glob = require("glob");

// config partials
var archetype = require("../archetype");
var Path = archetype.Path;
var AppMode = archetype.AppMode;
var context = Path.resolve(AppMode.src.client);
var configContext = Path.resolve(AppMode.src.dir);

var archetypeNodeModules = Path.join(archetype.dir, "node_modules");
var archetypeDevNodeModules = Path.join(archetype.devDir, "node_modules");
var inspectpack = process.env.INSPECTPACK_DEBUG === "true";

var optionalRequire = require("optional-require")(require);


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

  const entry = optionalRequire(entryPath,
    "Entry point configuration is not found, using default entry point...");

  return entry ? entry :
    fs.existsSync(Path.join(context, "app.js")) ? "./app.js" : "./app.jsx";
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


const basePartials = {};
glob.sync(Path.join(__dirname, 'partial/*.js')).forEach(function(filePath) {
  const fileName = Path.parse(filePath).name;
  const partial = require(filePath);
  // Potentially sort order of partials by sequence in the future. If multiple partials of equal
  // sequence, assume order is not important.
  if(partial.sequence === 0) {
    basePartials[fileName] = require(filePath);
  }
});

const customPartials = {};
glob.sync(Path.join(configContext, 'config/webpack/partial/*.js')).forEach(function(filePath) {
  const fileName = Path.parse(filePath).name;
  const partial = require(filePath);
  if(partial.sequence === 0) {
    customPartials[fileName] = require(filePath);
  }
});

const mergedPartials = _.merge(basePartials, customPartials);
const partials = _.reduce(
    mergedPartials,
    function(results, func) { 
      results.push(func()); 
      return results;
    },
    []
);

var configPartials = _.concat(
  [],
  mergeWebpackConfig.bind(null, {}, baseConfig),
  partials
);

module.exports = _.flow(configPartials)();
