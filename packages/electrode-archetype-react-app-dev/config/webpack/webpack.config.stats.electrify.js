"use strict";

const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const statsElectrifyProfile = {
    partials: {
      "_dev-mode": { order: 10000 },
      _stats: {
        order: 10100,
        options: {
          fullPaths: true
        }
      }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      "_stats-electrify": statsElectrifyProfile
    },
    profileNames: ["_base", "_stats-electrify"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
}

module.exports = makeConfig();
