"use strict";
/**
 * Webpack static dev configuration
 */
const baseProfile = require("../profile.base");
const Path = require("path");

function staticConfigs() {
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
      "_dev-static": devProfile
    },
    profileNames: ["_base", "_dev-static"],
    configFilename: Path.basename(__filename)
  };

  return options;
}

module.exports = staticConfigs();
