"use strict";

const archetype = require("electrode-archetype-react-component/config/archetype");
const browser = archetype.karma.browser.toLowerCase();

module.exports = function(settings) {
  if (browser === "chrome") {
    settings.browsers = ["ChromeHeadless"];
    settings.frameworks = ["mocha"];
    settings.crossOriginAttribute = false;
    console.log("Using Chrome Headless to run Karma test");

  } else if (browser === "phantomjs") {
    settings.browsers = ["PhantomJS"];
    settings.frameworks = ["mocha", "phantomjs-shim"];
    console.warn(
      "Using PhantomJS to run Karma test. It's been deprecated and may be removed in the future."
    );
  } else {
    console.error(`Unknown browser ${browser} set for Karma test. Failed.`);
    return process.exit(1);
  }

  return settings;
};
