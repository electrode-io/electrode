"use strict";

/* eslint-disable global-require */

const Fs = require("fs");
const Path = require("path");
const archetype = require("@xarc/app-dev/config/archetype")();

function useAppWebpackConfig() {
  return process.env.USE_APP_WEBPACK_CONFIG === "true";
}

function getWebpackStartConfig(defaultFile) {
  const customFilePath = Path.resolve("webpack.config.js");
  const canUseAppProfile = useAppWebpackConfig() && Fs.existsSync(customFilePath);

  if (canUseAppProfile) {
    return customFilePath;
  }

  return Path.join(archetype.config.webpack, defaultFile || "webpack.config.js");
}

function setWebpackProfile(profile) {
  if (useAppWebpackConfig()) {
    const logger = require("@xarc/app-dev/lib/logger");
    // verify that profile exist in options directory
    require.resolve(`../options/${profile}`);
    process.env.ELECTRODE_WEBPACK_PROFILE = profile || "production";
    logger.info(`Electrode Webpack Profile set to ${process.env.ELECTRODE_WEBPACK_PROFILE}`);
  }
}

module.exports = { useAppWebpackConfig, getWebpackStartConfig, setWebpackProfile };
