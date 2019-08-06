"use strict";

/**
 * Webpack dev configuration
 */
const baseProfile = require("../profile.base");
const Path = require("path");

function devOptions() {
    const devProfile = {
      partials: {
        "_dev-mode": { order: 10000 },
        _dev: { order: 10100 },
        "_html-reporter": { order: 10300 } // must be after _dev to override devServer
      }
    };

    const options = {
      profiles: {
        _base: baseProfile,
        _dev: devProfile
      },
      profileNames: ["_base", "_dev"],
      configFilename: Path.basename(__filename)
    };

    return options;
}

module.exports = devOptions();
