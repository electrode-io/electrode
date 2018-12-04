"use strict";
const Fs = require("fs");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;

const context = Path.resolve(AppMode.src.client);
const polyfill = archetype.webpack.enableBabelPolyfill;

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

module.exports = {
  context,
  entry: polyfill ? { main: ["@babel/polyfill", appEntry()] } : appEntry()
};
