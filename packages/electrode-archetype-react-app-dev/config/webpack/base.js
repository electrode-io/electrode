"use strict";

const _ = require("lodash");
const fs = require("fs");
const webpack = require("webpack");
const mergeWebpackConfig = require("webpack-partial").default;

// config partials
const babelConfig = require("./partial/babel");
const extractStylesConfig = require("./partial/extract");
const fontsConfig = require("./partial/fonts");
const imagesConfig = require("./partial/images");
const statsConfig = require("./partial/stats");
const isomorphicConfig = require("./partial/isomorphic");
const pwaConfig = require("./partial/pwa");
const archetype = require("../archetype");
const Path = archetype.Path;
const AppMode = archetype.AppMode;
const polyfill = archetype.webpack.enableBabelPolyfill;
const context = Path.resolve(AppMode.src.client);

const optionalRequire = require("optional-require")(require);
const ModuleResolver = require("./plugins/module-resolver");

const inspectpack = process.env.INSPECTPACK_DEBUG === "true";

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
  const entryPath = Path.join(context, "entry.config.js");

  const entry = optionalRequire(entryPath,
    "Entry point configuration is not found, using default entry point...");

  return entry ||
    fs.existsSync(Path.join(context, "app.js")) ? "./app.js" : "./app.jsx";
}

const baseConfig = {
  cache: true,
  context,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: false
      }
    })
  ],
  entry: {
    main: polyfill ? ["babel-polyfill", appEntry()] : appEntry()
  },
  output: {
    path: Path.resolve("dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: "[hash].[name].js",
    filename: "[name].bundle.[hash].js"
  },
  resolve: {
    modules: [
      AppMode.isSrc && Path.resolve(AppMode.src.dir) || null,
      process.cwd()
    ].concat(archetype.webpack.modulesDirectories)
      .filter(_.identity),
    plugins: [
      new ModuleResolver("module", undefined, "resolve")
    ],
    extensions: [".js", ".jsx", ".json"]
  },
  resolveLoader: {
    modules: [
      Path.resolve("lib"),
      process.cwd()
    ].concat(archetype.webpack.loaderDirectories)
      .filter(_.identity),
    plugins: [
      new ModuleResolver("module", undefined, "resolve")
    ]
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
