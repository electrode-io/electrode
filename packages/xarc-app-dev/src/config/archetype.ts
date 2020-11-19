/* eslint-disable @typescript-eslint/no-var-requires, max-statements, no-console */

import { XarcOptions } from "./opt2/xarc-options";
import { getDevArchetypeLegacy } from "./options";
const _ = require("lodash");
const getEnvProxy = require("./env-proxy");
import { saveXarcOptions, loadXarcOptions } from "../lib/utils";

let cachedArchetype = null;

/**
 * Get development options
 *
 * @param user - user options
 * @returns options - final options with defaults and env applied
 */
module.exports = function getDevOptions(user: XarcOptions = {}) {
  //added this check because options.ts is setting our default values and cached is missing our xarc option into file
  if (
    !_.isNil(user) &&
    !_.isNil(user.XARC_CWD) &&
    !_.isNil(cachedArchetype) &&
    _.isNil(cachedArchetype.options.XARC_CWD)
  ) {
    cachedArchetype.options.XARC_CWD = user.XARC_CWD;
    saveXarcOptions(cachedArchetype);
  }

  if (cachedArchetype) {
    cachedArchetype._fromCache = true;
    // maintained for backwards compatibility
    return cachedArchetype;
  }

  // first get legacy configs
  const legacy = getDevArchetypeLegacy();
  // try to read xarc-options.json if it exist and merge it into legacy
  const xarcOptions = loadXarcOptions();
  user = _.merge({}, user, xarcOptions);
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

  //added XARC CMD option
  if (!_.isNil(user) && !_.isNil(user.XARC_CWD)) {
    legacy.options.XARC_CWD = user.XARC_CWD;
  }

  saveXarcOptions(legacy);

  cachedArchetype = legacy;

  return cachedArchetype;
};
