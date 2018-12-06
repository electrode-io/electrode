"use strict";
/**
 * Webpack coverage configuration
 */
const baseProfile = require("./profile.base");
const testBaseProfile = require("./profile.base.test");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const coverageProfile = {
    partials: {
      "_dev-mode": { order: 10000 },
      _coverage: { order: 10100 },
      "_sourcemaps-inline": { order: 10200 },
      "_simple-progress": { order: 10300 }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      "_test-base": testBaseProfile,
      _coverage: coverageProfile
    },
    profileNames: ["_base", "_test-base", "_coverage"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
}

module.exports = makeConfig();
