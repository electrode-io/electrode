/* eslint-disable @typescript-eslint/no-var-requires */

import requireAt from "require-at";

/**
 * Resolve full path of a plugin that's the dependency of another npm package
 *
 * @param depPkg - pkg that depends on the plugin
 * @param pluginName - name of plugin to look for
 * @returns full path to a plugin as dep of another package
 */
export function getPluginFrom(depPkg: string | string[], pluginName: string): string {
  let err: Error;
  for (const pkg of [].concat(depPkg)) {
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

export { loadXarcOptions, detectCSSModule } from "../../lib/utils";
