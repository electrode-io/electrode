/* eslint-disable @typescript-eslint/no-var-requires */

const archetypeConfig = require("@xarc/app-dev/config/archetype");
const logger = require("@xarc/app-dev/lib/logger");

// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

module.exports = function(options) {
  const archetype = archetypeConfig();
  const config = options.currentConfig;

  if (
    process.env.NODE_ENV === "production" &&
    config.target === undefined &&
    archetype.webpack.enableNodeSourcePlugin !== true
  ) {
    logger.info("Disabling NodeSourcePlugin for production");
    return { node: false };
  } else {
    logger.info(`Not disabling NodeSourcePlugin.  NODE_ENV: '${process.env.NODE_ENV}'`);
    return {};
  }
};
