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
      _dev_mode: { order: 10000 },
      _define: { order: 10100 },
      _dev: { order: 10200 }
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
