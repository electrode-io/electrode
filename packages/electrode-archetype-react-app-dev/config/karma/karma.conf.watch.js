"use strict";

/*
 * Karma Configuration: "watch" version.
 *
 * This configuration allows live updates of code changes.
 */

const dev = require("./karma.conf.dev");
const loadUserConfig = require("./util/load-user-config");
const Path = require("path");

module.exports = function(config) {
  dev(config);
  const settings = {
    crossOriginAttribute: false,
    files: [
      // Test bundle (must be created via `npm run dev|hot|server-test`)
      "http://127.0.0.1:3001/assets/bundle.js"
      // Watch these files but do not add them to the bundle.
    ].concat(
      ["src/client/**", "test/**"].map(pattern => {
        return {
          pattern,
          included: false,
          served: false,
          watched: true
        };
      })
    )
  };

  loadUserConfig(Path.basename(__filename), config, settings);
};
