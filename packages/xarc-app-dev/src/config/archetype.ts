/* eslint-disable @typescript-eslint/no-var-requires, max-statements, no-console */

import { XarcOptions } from "./opt2/xarc-options";
import { getDevArchetypeLegacy } from "./options";
import { createGitIgnoreDir } from "../lib/utils";
const Fs = require("fs");
const _ = require("lodash");
const getEnvProxy = require("./env-proxy");
const Path = require("path");

let cachedArchetype = null;

function createElectrodeTmpDir(eTmpDir = ".etmp") {
  createGitIgnoreDir(Path.resolve(eTmpDir), "Electrode tmp dir");
}

function saveArchetypeConfig(config) {
  const filename = `${config.eTmpDir}/xarc-options.json`;
  const copy = { ...config, pkg: undefined, devPkg: undefined };
  let existStr;

  try {
    existStr = Fs.readFileSync(filename, "utf-8");
  } catch (err) {
    //
  }

  const str = JSON.stringify(copy, null, 2);
  if (str !== existStr) {
    try {
      createElectrodeTmpDir(config.eTmpDir);

      Fs.writeFileSync(filename, str);
    } catch (err) {
      console.error(
        `Unable to save development options to ${filename} - this will cause other failures.\n`,
        err
      );
    }
  }
}

/**
 * Get development options
 *
 * @param user - user options
 * @returns options - final options with defaults and env applied
 */
module.exports = function getDevOptions(user: XarcOptions = {}) {
  if (cachedArchetype) {
    cachedArchetype._fromCache = true;
    // maintained for backwards compatibility
    return cachedArchetype;
  }

  // first get legacy configs
  const legacy = getDevArchetypeLegacy();

  const proxy = getEnvProxy();

  // proxy config was not set in legacy, so add to top level here
  _.merge(legacy, proxy);

  // merge user.webpackOptions into legacy.webpack
  _.merge(legacy.webpack, user.webpackOptions);
  // merge user.babelOptions into legacy.babel
  _.merge(legacy.babel, user.babelOptions);
  // merge user.addOnFeatures into legacy.options
  _.merge(legacy.options, user.addOnFeatures);
  // merge the rest into top level
  _.merge(legacy, {
    ...user,
    webpackOptions: undefined,
    babelOptions: undefined,
    addOnFeatures: undefined
  });

  saveArchetypeConfig(legacy);

  cachedArchetype = legacy;

  return cachedArchetype;
};
