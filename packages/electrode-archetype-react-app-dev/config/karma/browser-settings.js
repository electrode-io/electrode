"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const logger = require("electrode-archetype-react-app/lib/logger");

module.exports = function(settings) {
  const browser = archetype.karma.browser.toLowerCase();
  if (browser === "chrome") {
    settings.browsers = ["Chrome", "Chrome_without_security"];
    settings.customLaunchers = {
      Chrome_without_security: {
        base: "Chrome",
        flags: ["--disable-web-security"]
      },
      Chrome_travis_ci: {
        base: "Chrome",
        flags: ["--no-sandbox"]
      }
    };
    logger.info("Using Chrome Headless to run Karma test");

    if (process.env.TRAVIS) {
      settings.browsers = ["Chrome_travis_ci"];
    }

  } else if (browser === "phantomjs") {
    settings.frameworks.push("phantomjs-shim");
    settings.browser = ["PhantomJS"];
    logger.warn(
      "Using PhantomJS to run Karma test. It's been deprecated and may be removed in the future."
    );
  } else {
    logger.error(`Unknown browser ${browser} set for Karma test. Failed.`);
    return process.exit(1);
  }

  return settings;
};
