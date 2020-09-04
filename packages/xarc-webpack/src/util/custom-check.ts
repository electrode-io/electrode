/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable global-require */

import * as Fs from "fs";
import * as Path from "path";

const archetype = require("@xarc/app-dev/config/archetype")();

function useAppWebpackConfig() {
  return process.env.USE_APP_WEBPACK_CONFIG === "true";
}

function getWebpackStartConfig(defaultFile: string, relativeToCwd = true) {
  const customFilePath = Path.resolve("webpack.config.js");
  const canUseAppProfile = useAppWebpackConfig() && Fs.existsSync(customFilePath);

  const configFilePath = canUseAppProfile
    ? customFilePath
    : Path.join(archetype.config.webpack, defaultFile || "webpack.config.js");

  if (relativeToCwd && Path.isAbsolute(configFilePath)) {
    const cwdRel = Path.relative(process.cwd(), configFilePath);
    return cwdRel.length < configFilePath.length ? cwdRel : configFilePath;
  } else {
    return configFilePath;
  }
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
