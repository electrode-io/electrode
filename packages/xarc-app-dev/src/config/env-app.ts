export function getEnvApp() {
  const xenvConfig = require("xenv-config");
  const { merge } = require("lodash");

  const appConfigSpec = {
    host: { env: ["HOST"], default: "localhost" },
    port: { env: ["PORT"], default: 3000 },
    portForProxy: {
      env: ["APP_PORT_FOR_PROXY", "APP_SERVER_PORT"],
      default: 0,
      envMap: { false: 0, true: 3100 },
      post: x => x || 0
    }
  };

  return xenvConfig(appConfigSpec, {}, { merge });
}
