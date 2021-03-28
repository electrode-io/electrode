/* eslint-disable global-require, @typescript-eslint/no-var-requires */

const notifyBundleValid = require("../util/notify-bundle-valid");
import { logger } from "@xarc/dev-base";

/* eslint max-statements: 0 */
function webpackDevReporter(reporterOptions) {
  const state = reporterOptions.state;
  const stats = reporterOptions.stats;
  const options = reporterOptions.options;

  if (state) {
    let displayStats = !options.quiet && options.stats !== false;

    if (displayStats && !(stats.hasErrors() || stats.hasWarnings()) && options.noInfo) {
      displayStats = false;
    }

    if (displayStats) {
      logger.info(stats.toString(options.stats));
    }

    if (!options.noInfo && !options.quiet) {
      let errMsg = ".";
      if (!stats.hasErrors()) {
        notifyBundleValid();
      } else {
        errMsg = " but there were errors.";
      }
      logger.info(`webpack: bundle is now VALID ${errMsg}`);
    }
  } else {
    logger.info("webpack: bundle is now INVALID.");
  }
}

module.exports = webpackDevReporter;
