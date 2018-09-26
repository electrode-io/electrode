"use strict";
/**
 * Webpack static dev configuration
 */
const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const devProfile = {
    partials: {
      "_dev-mode": { order: 10000 },
      _define: { order: 10100 },
      _dev: { order: 10200 }
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

  return generateConfig(options);
}

module.exports = makeConfig();
