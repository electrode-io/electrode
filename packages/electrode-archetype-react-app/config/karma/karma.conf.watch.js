"use strict";

/*
 * Karma Configuration: "watch" version.
 *
 * This configuration allows live updates of code changes.
 */

var dev = require("./karma.conf.dev");

module.exports = function (config) {
  dev(config);

  config.set({
    files: [
      // Test bundle (must be created via `npm run dev|hot|server-test`)
      "http://127.0.0.1:3001/assets/bundle.js"
      // Watch these files but do not add them to the bundle.
    ].concat(
      [
        "client/**",
        "test/**"
      ].map(function (pattern) {
        return {
          pattern: pattern,
          included: false,
          served: false,
          watched: true
        };
      })
    )
  });

};

