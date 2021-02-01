/* eslint-disable @typescript-eslint/no-var-requires, max-statements, no-console */

import { XarcInternalOptions, XarcOptions } from "./opt2/xarc-options";
import { getDevArchetypeLegacy } from "./options";
import _ from "lodash";
import { getEnvProxy } from "./env-proxy";
import { saveXarcOptions, loadXarcOptions } from "../lib/utils";

let cachedArchetype = null;

/**
 * Get development options
 *
 * @param userOptions - user options
 * @returns options - final options with defaults and env applied
 */
export function getDevOptions(userOptions: XarcOptions = null): XarcInternalOptions {
  if (!userOptions && cachedArchetype) {
    // if cached is already running
    cachedArchetype._fromCache = true;
    // maintained for backwards compatibility
    return cachedArchetype;
  }

  // first get legacy configs
  const legacy = getDevArchetypeLegacy();

  // try to read xarc-options.json if it exist and merge it into legacy
  const xarcOptions = userOptions
    ? {}
    : {
        ...loadXarcOptions(process.env.XARC_CWD || process.cwd(), false),
        // don't want these from saved options because the calculated ones in
        // legacy is most up to date.  otherwise an outdated saved options
        // will break everything if dependencies were updated
        dir: undefined,
        devDir: undefined,
        config: undefined,
        cwd: undefined // we know what this is already
      };

  const finalOptions = _.merge({}, xarcOptions, userOptions);

  // checking for cwd from options or from env
  const cwd = finalOptions.cwd || process.env.XARC_CWD || process.cwd();
  process.env.XARC_CWD = cwd;

  const proxy = getEnvProxy();

  // proxy config was not set in legacy, so add to top level here
  _.merge(legacy, proxy);

  // merge user.webpackOptions into legacy.webpack
  _.merge(legacy.webpack, finalOptions.webpackOptions);
  // merge user.babelOptions into legacy.babel
  _.merge(legacy.babel, finalOptions.babelOptions);
  // merge user.addOnFeatures into legacy.options
  _.merge(legacy.options, finalOptions.addOnFeatures);
  // merge the rest into top level
  _.merge(legacy, {
    ...finalOptions,
    cwd,
    webpackOptions: undefined,
    babelOptions: undefined,
    addOnFeatures: undefined
  });

  // if user's options exist, it means this is invoked by user passing in options
  // the first time, so save it.
  if (finalOptions) {
    saveXarcOptions(legacy);
  }

  cachedArchetype = legacy;

  return cachedArchetype;
}
