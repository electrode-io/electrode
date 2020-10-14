/* eslint-disable @typescript-eslint/no-var-requires */

import * as requireAt from "require-at";

//
// Resolve full path of a plugin that's the dependency of host npm package
//
export function getPluginFrom(host, pluginName) {
  let err;
  for (const pkg of [].concat(host)) {
    try {
      return requireAt(require.resolve(`${pkg}/package.json`)).resolve(pluginName);
    } catch (e) {
      if (!err) {
        err = e;
      }
    }
  }
  throw err;
}

export { loadXarcOptions } from "../../lib/utils";
