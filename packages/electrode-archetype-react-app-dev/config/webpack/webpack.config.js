"use strict";

const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const productionProfile = {
    partials: {
      "_prod-mode": { order: 10000 },
      "_dll-reference": { order: 10100 },
      _uglify: { order: 10200 },
      _locales: { order: 10300 },
      "_sourcemaps-remote": { order: 10400 },
      _fail: { order: 10500 },
      "_simple-progress": { order: 10600 }
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
