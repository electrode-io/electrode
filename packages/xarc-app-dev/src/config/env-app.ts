import xenvConfig from "xenv-config";
import { merge } from "lodash";

/**
 * Get app settings from env
 *
 * @returns app settings
 */
export function getEnvApp(): any {
  const appConfigSpec = {
    host: { env: ["HOST"], default: "localhost" },
    port: { env: ["PORT"], default: 3000 },
    //
    // in dev mode with proxy, the port app server listen on for the proxy
    // default to 0 to randomly select an available port
    //
    portForProxy: {
      env: ["APP_PORT_FOR_PROXY", "APP_SERVER_PORT"],
      default: 0,
      envMap: { false: -1, true: 0 },
      post: x => x || 0
    }
  };

  return xenvConfig(appConfigSpec, {}, { merge });
}
