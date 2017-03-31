"use strict";

var baseProfile = require("./profile.base");
var generateConfig = require("./util/generate-config");
var Path = require("path");

function makeConfig() {
  const devProfile = {
    partials: {
      "_define": { order: 10100 },
      "_dev": { order: 10200 }
    }
  };

  const options = {
    profiles: {
      "_base": baseProfile,
      "_dev": devProfile
    },
    profileNames: ["_base", "_dev"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
};

module.exports = makeConfig();
