"use strict";

var _ = require("lodash");
var path = require("path");
var fs = require("fs");
var mergeWebpackConfig = require("webpack-partial").default;

// config partials
var babelConfig = require("./partial/babel");
var extractStylesConfig = require("./partial/extract");
var fontsConfig = require("./partial/fonts");
var imagesConfig = require("./partial/images");
var statsConfig = require("./partial/stats");
var isomorphicConfig = require("./partial/isomorphic");

var archetypeNodeModules = path.join(__dirname, "../../node_modules");
var archetypeDevNodeModules = path.join(
  // A normal `require.resolve` looks at `package.json:main`. We instead want
  // just the _directory_ of the module. So use heuristic of finding dir of
  // package.json which **must** exist at a predictable location.
  path.dirname(require.resolve("@walmart/electrode-archetype-react-app-dev/package.json")),
  "node_modules"
);

var context = path.join(process.cwd(), "client");

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
  var entryPath = path.join(process.cwd(), "entry.config.js");
  if (fs.existsSync(entryPath)) {
    return require(entryPath);
  }

  return fs.existsSync(path.join(context, "app.js")) ? "./app.js" : "./app.jsx";
}

var baseConfig = {
  cache: true,
  context: context,
  debug: false,
  entry: appEntry(),
  output: {
    path: path.join(process.cwd(), "dist/js"),
    filename: "[name].bundle.[hash].js"
  },
  resolve: {
    root: [archetypeNodeModules, archetypeDevNodeModules, process.cwd()],
    modulesDirectories: ["client", "node_modules", "node_modules/@walmart"],
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
  isomorphicConfig()
)();
