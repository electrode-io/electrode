"use strict";

const Path = require("path");
const filterScanDir = require("filter-scan-dir");
const archetype = require("@xarc/app/config/archetype");
const AppMode = archetype.AppMode;
const getOptRequire = require("../util/get-opt-require");

function detectCSSModule() {
  if (getOptRequire("electrode-archetype-opt-postcss").invalid) {
    return false;
  }

  if (archetype.webpack.cssModuleSupport !== undefined) {
    return Boolean(archetype.webpack.cssModuleSupport);
  }

  const scanned = filterScanDir.sync({
    dir: Path.resolve(AppMode.src.client),
    grouping: true,
    filter: (file, path, extras) => {
      const ext = extras.ext.toLowerCase();
      return [".css", ".styl", ".scss", ".less"].indexOf(ext) >= 0 ? ext.substr(1) : false;
    }
  });

  /*
   * cssModuleSupport default to undefined
   *
   * when cssModuleSupport not specified:
   *
   * *only* *.css, cssModuleSupport set to true
   * other style files (styl, scss, less) exist => set to false
   */

  delete scanned.files;

  return Object.keys(scanned).length === 1 && scanned.hasOwnProperty("css");
}

module.exports = detectCSSModule;
