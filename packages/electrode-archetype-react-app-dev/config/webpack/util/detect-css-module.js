"use strict";

const Path = require("path");
const glob = require("glob");
const archetype = require("electrode-archetype-react-app/config/archetype");

function detectCSSModule() {
  let cssModuleSupport = archetype.webpack.cssModuleSupport;
  const cssExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.css")).length > 0;
  const stylusExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.styl")).length > 0;
  const scssExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.scss")).length > 0;

  /*
 * cssModuleSupport default to undefined
 *
 * when cssModuleSupport not specified:
 * *only* *.css, cssModuleSupport sets to true
 * *only* *.styl, cssModuleSupport sets to false
 * *only* *.scss, cssModuleSupport sets to false
 */
  if (cssModuleSupport === undefined) {
    cssModuleSupport = cssExists && !stylusExists && !scssExists;
  }

  return cssModuleSupport;
}

module.exports = detectCSSModule;
