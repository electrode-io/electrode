"use strict";
const Fs = require("fs");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const archetype = require("electrode-archetype-react-app/config/archetype");
const _ = require("lodash");
const AppMode = archetype.AppMode;

const context = Path.resolve(AppMode.src.client);

const logger = require("electrode-archetype-react-app/lib/logger");

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

  const entry = optionalRequire(entryPath, {
    notFound: () =>
      logger.info(
        `Entry point configuration ${entryPath} is not found, using default entry point...`
      )
  });

  return entry || (Fs.existsSync(Path.join(context, "app.js")) ? "./app.js" : "./app.jsx");
}

function shouldPolyfill() {
  if (archetype.webpack.enableBabelPolyfill) {
    const hasMultipleTarget =
      Object.keys(archetype.babel.envTargets)
        .sort()
        .join(",") !== "default,node";
    if (hasMultipleTarget) {
      return archetype.babel.target === "default";
      // for all other targets, disable polyfill
    } else {
      return true;
    }
  }
  return false;
}

function makeEntry() {
  let entry = appEntry();
  const polyfill = shouldPolyfill();
  if (polyfill) {
    const babelPolyfill = "babel-polyfill";
    if (_.isArray(entry)) {
      entry = { main: [babelPolyfill, ...entry] };
    } else if (_.isObject(entry)) {
      entry = Object.entries(entry).reduce((prev, [k, v]) => {
        prev[k] = [babelPolyfill].concat(v);
        return prev;
      }, {});
    } else {
      entry = { main: [babelPolyfill, entry] };
    }
  }
  return entry;
}

module.exports = {
  context,
  entry: makeEntry()
};
