"use strict";

/**
 * Webpack frontend test (w/ coverage) configuration.
 */
var archDevRequire = require("electrode-archetype-react-component-dev/require");

var testCfg = require("./webpack.config.test");
var baseProfile = require("./profile.base");
var testBaseProfile = require("./profile.base.test");

var generateConfig = require("./util/generate-config");

function makeConfig() {
  const browserCoverageProfile = {
    partials: {
      "_coverage": { order: 10100 }
    }
  };

  const options = {
    profiles: {
      "_base": baseProfile,
      "_test-base": testBaseProfile,
      "_coverage": coverageProfile
    },
    profileNames: ["_base", "_test-base", "_coverage"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
};

module.exports = makeConfig();
