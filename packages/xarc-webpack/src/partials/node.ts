/* eslint-disable @typescript-eslint/no-var-requires */

import { loadXarcOptions } from "@xarc/app-dev/lib/utils";
const logger = require("@xarc/app-dev/lib/logger");

module.exports = function(options) {
  const xarcOptions = loadXarcOptions();
  const config = options.currentConfig;

  if (
    process.env.NODE_ENV === "production" &&
    config.target === undefined &&
    xarcOptions.webpack.enableNodeSourcePlugin !== true
  ) {
    logger.info("Disabling NodeSourcePlugin for production");
    return { node: false };
  } else {
    logger.info(`Not disabling NodeSourcePlugin.  NODE_ENV: '${process.env.NODE_ENV}'`);
    return {};
  }
};
