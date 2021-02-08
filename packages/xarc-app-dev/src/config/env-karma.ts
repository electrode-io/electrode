import xenvConfig from "xenv-config";
import { merge } from "lodash";
import { getUserConfig } from "./user-config";

/**
 * Get karma settings from env (deprecated)
 *
 * @returns karma settings from env
 */
export function getEnvKarma(): any {
  const karmaConfigSpec = {
    browser: { env: "KARMA_BROWSER", default: "chrome" }
  };
  return xenvConfig(karmaConfigSpec, getUserConfig().karma, { merge });
}
