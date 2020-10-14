/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable no-magic-numbers */

/*
 * This partial adds DllReferencePlugin to the main bundle for referencing
 * DLL bundles.
 */

import * as fs from "fs";
import * as Path from "path";
import * as webpack from "webpack";
const filterScanDir = require("filter-scan-dir");
import { loadXarcOptions } from "../util/load-xarc-options";
const logger = require("@xarc/app-dev/lib/logger");

module.exports = function(options) {
  const xarcOptions = loadXarcOptions();

  const config = options.currentConfig;
  logger.verbose("add-dll-references configurations", JSON.stringify(config, null, 2));

  try {
    const exists = fs.existsSync(Path.resolve(xarcOptions.AppMode.src.client, "dll.config.js"));
    const filenames = filterScanDir.sync({
      dir: Path.resolve("dll", "js"),
      includeRoot: true,
      filter(file, path, extras) {
        return extras.ext === ".json" && file.indexOf("-manifest") >= 0;
      }
    });

    if (exists && filenames.length) {
      return {
        plugins: filenames.map(
          filename =>
            new webpack.DllReferencePlugin({
              context: config.context,
              manifest: require(filename) // eslint-disable-line global-require
            })
        )
      };
    }
  } catch (err) {
    logger.error("add-dll-references failed: %s", err);
  }

  return {};
};
