/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";

const filterScanDir = require("filter-scan-dir");
const getOptRequire = require("../util/get-opt-require");
import { loadXarcOptions } from "../util/load-xarc-options";

function detectCSSModule() {
  const archetype = loadXarcOptions();
  const AppMode = archetype.AppMode;

  // if user explicitly says they want CSS module support, then we enable it
  if (archetype.webpack.cssModuleSupport !== undefined) {
    return Boolean(archetype.webpack.cssModuleSupport);
  }

  // without postcss we don't want to do CSS module by default
  if (getOptRequire(["@xarc/opt-postcss", "electrode-archetype-opt-postcss"]).invalid) {
    return false;
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
