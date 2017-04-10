"use strict";

/**
 * Webpack dev configuration
 */
const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const devProfile = {
    partials: {
      "_uglify": {
        order: 10100
      },
      "_define": {
        order: 10200
      },
      "_sourcemaps-remote": {
        order: 10300
      },
      "_fail": {
        order: 10400
      }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      _dev: devProfile
    },
    profileNames: ["_base", "_dev"],
    configFilename: Path.basename(__filename)
  };

  let config = generateConfig(options);
  config.output.filename = config.output.filename.replace(/\.min\.js$/, ".js");
  return config;
}

module.exports = makeConfig();
