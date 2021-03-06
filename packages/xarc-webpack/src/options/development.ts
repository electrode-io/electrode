/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Webpack dev configuration
 */
const baseProfile = require("../profile.base");
import * as Path from "path";

function devOptions() {
  const devProfile = {
    partials: {
      "_dev-mode": { order: 10000 },
      _dev: { order: 10100 }
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

  return options;
}

module.exports = devOptions();
