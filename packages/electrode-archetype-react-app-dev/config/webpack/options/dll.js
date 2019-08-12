"use strict";

/**
 * Webpack dev configuration
 */
const baseProfile = require("../profile.base");
const Path = require("path");

function dllConfigs() {
  const dllProfile = {
    partials: {
      "_prod-mode": { order: 10000 },
      "_dll-entry": { order: 10100 },
      "_dll-output": { order: 10200 },
      _dll: { order: 10300 },
      _stats: {
        options: {
          filename: "../../dll/server/stats.dll.json"
        }
      },
      _isomorphic: {
        options: {
          assetsFile: "../../dll/isomorphic-assets.dll.json"
        }
      }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      _dll: dllProfile
    },
    profileNames: ["_base", "_dll"],
    configFilename: Path.basename(__filename)
  };

  return options;
}

module.exports = dllConfigs();
