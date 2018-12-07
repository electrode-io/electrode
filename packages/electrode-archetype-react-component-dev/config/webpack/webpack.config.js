"use strict";

const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const productionProfile = {
    partials: {
      _prod_mode: { order: 10000 },
      _uglify: { order: 10100 },
      _define: { order: 10200 },
      "_sourcemaps-remote": { order: 10300 },
      _fail: { order: 10400 }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      _production: productionProfile
    },
    profileNames: ["_base", "_production"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
}

module.exports = makeConfig();
