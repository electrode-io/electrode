"use strict";

/**
 * Webpack dev configuration
 */
const baseProfile = require("../profile.base");
const Path = require("path");

function browserCoverage() {
    const browserCoverageProfile = {
      partials: {
        "_dev-mode": { order: 10000 },
        _uglify: { order: 10100 },
        _locales: { order: 10200 },
        _coverage: { order: 10300 },
        "_sourcemaps-inline": { order: 10400 }
      }
    };

    const options = {
      profiles: {
        _base: baseProfile,
        "_browser-coverage": browserCoverageProfile
      },
      profileNames: ["_base", "_browser-coverage"],
      configFilename: Path.basename(__filename)
    };

    return options;
  }

module.exports = browserCoverage();
