"use strict";

const Path = require("path");
const glob = require("glob");
const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const { getOptArchetypeRequire } = require("../../../lib/utils");

function detectCSSModule() {
  if (getOptArchetypeRequire("electrode-archetype-opt-postcss").invalid) {
    return false;
  }

  const cssExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.css")).length > 0;
  const stylusExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.styl")).length > 0;
  const scssExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.scss")).length > 0;
  const lessExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.less")).length > 0;

  /*
   * cssModuleSupport default to undefined
   *
   * when cssModuleSupport not specified:
   * *only* *.css, cssModuleSupport sets to true
   * *only* *.styl, cssModuleSupport sets to false
   * *only* *.scss, cssModuleSupport sets to false
   */

  return cssExists && !stylusExists && !scssExists && !lessExists;
}

module.exports = detectCSSModule;
