/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable global-require */

import * as Fs from "fs";
import * as Path from "path";
import * as _ from "lodash";
import { loadXarcOptions } from "../util/load-xarc-options";
import { logger } from "@xarc/dev-base";

import * as requireAt from "require-at";

function getWebpackStartConfig(defaultFile: string, relativeToCwd = true) {
  const xarcOptions = loadXarcOptions();

  let customFilePath;

  if (_.get(xarcOptions, "webpack.useAppWebpackConfig") !== false) {
    ["webpack.config.js", "webpack.config.ts"].find(f => {
      const ff = Path.resolve(f);

      if (Fs.existsSync(ff)) {
        customFilePath = ff;
        return ff;
      }

      return false;
    });
  }

  const configFilePath =
    customFilePath ||
    Path.join(
      _.get(xarcOptions, "config.webpack", process.cwd()),
      defaultFile || "webpack.config.js"
    );

  if (Path.extname(configFilePath) === ".ts") {
    try {
      // eslint-disable-next-line
      requireAt(xarcOptions.cwd)("ts-node/register");
    } catch (err) {
      console.error(`Your webpack config is .ts but loading ts-node/register failed`); // eslint-disable-line
      console.error(err.stack); // eslint-disable-line
      throw err;
    }
  }

  if (relativeToCwd && Path.isAbsolute(configFilePath)) {
    const cwdRel = Path.relative(xarcOptions.cwd, configFilePath);
    return cwdRel.length < configFilePath.length ? cwdRel : configFilePath;
  } else {
    return configFilePath;
  }
}

function setWebpackProfile(profile) {
  const xarcOptions = loadXarcOptions();

  if (xarcOptions.webpack.useAppWebpackConfig !== false) {
    // verify that profile exist in options directory
    require.resolve(`../options/${profile}`);
    process.env.ELECTRODE_WEBPACK_PROFILE = profile || "production";
    logger.info(`Electrode Webpack Profile set to ${process.env.ELECTRODE_WEBPACK_PROFILE}`);
  }
}

module.exports = { getWebpackStartConfig, setWebpackProfile };
