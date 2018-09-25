"use strict";
/**
 * Webpack hot configuration
 */

const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const hotProfile = {
    partials: {
      _dev_mode: { order: 10000 },
      _define: { order: 10100 },
      _dev: { order: 10200 },
      _hot: { order: 10400 },
      _babel: {
        options: {
          HotModuleReload: true
        }
      }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      _hot: hotProfile
    },
    profileNames: ["_base", "_hot"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
}

module.exports = makeConfig();
