"use strict";

const browserSettings = require("./browser-settings");

/*
 * Karma Configuration: "dev" version.
 *
 * This configuration relies on a `webpack-dev-server` already running and
 * bundling `webpack.config.test.js` on port 3001. If this is not running,
 * then the alternate `karma.conf.js` file will _also_ run the webpack dev
 * server during the test run.
 */
module.exports = function(config) {
  const base = {
    reporters: ["spec"],
    basePath: process.cwd(), // repository root.
    files: [
      // Test bundle (must be created via `npm run server-test`)
      "http://127.0.0.1:3001/assets/bundle.js"
    ],
    port: 9999,
    singleRun: true,
    autoWatchBatchDelay: 500,
    client: {
      mocha: {
        ui: "bdd"
      }
    }
  };

  browserSettings(base);

  config.set(base);
};
