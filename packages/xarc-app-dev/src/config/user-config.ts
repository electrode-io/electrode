/* eslint-disable @typescript-eslint/no-var-requires */

import Path from "path";
import { merge } from "lodash";
import { makeOptionalRequire } from "optional-require";

const optionalRequire = makeOptionalRequire(require);

let cachedUserConfig = null;
/**
 * Load user's config under the directory archetype/config
 */
export function getUserConfig() {
  cachedUserConfig =
    cachedUserConfig || merge({ options: {} }, optionalRequire(Path.resolve("archetype/config")));
  return cachedUserConfig;
}
