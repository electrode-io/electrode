"use strict";
/**
 * Webpack dev configuration
 */
const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const devProfile = {
    partials: {
      "_dev-mode": { order: 10000 },
      _dev: { order: 10100 }
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

  return generateConfig(options);
}

module.exports = makeConfig();
