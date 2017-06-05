"use strict";
/*
 * Karma Configuration: "dev" version.
 *
 * This configuration relies on a `webpack-dev-server` already running and
 * bundling `webpack.config.test.js` on port 3001. If this is not running,
 * then the alternate `karma.conf.js` file will _also_ run the webpack dev
 * server during the test run.
 */

const loadUserConfig = require("./util/load-user-config");
const Path = require("path");
const logger = require("electrode-archetype-react-app/lib/logger");
const archetype = require("electrode-archetype-react-app/config/archetype");

module.exports = function(config) {
  const settings = {
    reporters: ["spec"],
    basePath: process.cwd(), // repository root.
    files: [
      // Test bundle (must be created via `npm run dev|hot|server-test`)
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

  if (archetype.karma.enableChromeHeadless) {
    Object.assign(settings, {
      frameworks: ["mocha"],
      browsers: ["Chrome", "Chrome_without_security"],
      customLaunchers: {
        Chrome_without_security: { // eslint-disable-line camelcase
          base: "Chrome",
          flags: ["--disable-web-security"]
        },
        Chrome_travis_ci: { // eslint-disable-line camelcase
          base: "Chrome",
          flags: ["--no-sandbox"]
        }
      }
    });
  } else {
    Object.assign(settings, {
      frameworks: ["mocha", "phantomjs-shim"],
      browsers: ["PhantomJS"]
    });

    // eslint-disable-next-line max-len
    logger.warn("PhantomJS has been deprecated, to use chrome headless, please set env 'ENABLE_CHROME_HEADLESS' to true.");
  }

  if (process.env.TRAVIS) {
    settings.browsers = ["Chrome_travis_ci"];
  }

  loadUserConfig(Path.basename(__filename), config, settings);
};
