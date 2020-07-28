/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Webpack static dev configuration
 */
const baseProfile = require("../profile.base");
import * as Path from "path";

function staticConfigs() {
  const devProfile = {
    partials: {
      "_dev-mode": { order: 10000 },
      _dev: { order: 10100 }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      "_dev-static": devProfile
    },
    profileNames: ["_base", "_dev-static"],
    configFilename: Path.basename(__filename)
  };

  return options;
}

module.exports = staticConfigs();
