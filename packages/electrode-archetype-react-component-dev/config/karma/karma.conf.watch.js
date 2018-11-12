"use strict";

/*
 * Karma Configuration: "watch" version.
 *
 * This configuration allows live updates of code changes.
 */
var baseConf = require("./karma.conf.dev");

module.exports = function(config) {
  baseConf(config);
  config.set({
    files: [
      // Test bundle (must be created via `npm run server-test`)
      "http://127.0.0.1:3001/assets/bundle.js"
      // Watch these files but do not add them to the bundle.
    ].concat(
      ["src/**", "test/**"].map(function(pattern) {
        return { pattern: pattern, included: false, served: false, watched: true };
      })
    )
  });
};
