"use strict";
/**
 * Webpack dev configuration
 */
const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const options = {
    profiles: {
      _base: baseProfile
    },
    profileNames: ["_base"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
}

const finalConfig = makeConfig();

module.exports = finalConfig;
