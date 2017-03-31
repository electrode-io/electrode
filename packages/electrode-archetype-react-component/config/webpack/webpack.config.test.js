"use strict";
/**
 * Webpack coverage configuration
 */
const baseProfile = require("./profile.base");
const testBaseProfile = require("./profile.base.test");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const options = {
    profiles: {
      _base: baseProfile,
      "_test-base": testBaseProfile
    },
    profileNames: ["_base", "_test-base"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
}

module.exports = makeConfig();
