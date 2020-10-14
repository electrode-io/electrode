/* eslint-disable @typescript-eslint/no-var-requires, no-process-exit */

import { loadXarcOptions } from "../../lib/utils";

module.exports = function(settings) {
  const xarcOptions = loadXarcOptions();
  const logger = require("@xarc/app/lib/logger");
  const browser = xarcOptions.karma.browser.toLowerCase();
  if (browser === "chrome") {
    settings.browsers = ["ChromeHeadless"];

    logger.info("Using Chrome Headless to run Karma test");
  } else if (browser === "phantomjs") {
    settings.frameworks.push("phantomjs-shim");
    settings.browsers = ["PhantomJS"];

    logger.warn(
      "Using PhantomJS to run Karma test. It's been deprecated and may be removed in the future."
    );
  } else {
    logger.error(`Unknown browser ${browser} set for Karma test. Failed.`);
    return process.exit(1);
  }

  return settings;
};
