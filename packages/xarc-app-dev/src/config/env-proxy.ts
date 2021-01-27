import xenvConfig from "xenv-config";
import { isValidPort } from "../lib/utils";

import { merge } from "lodash";

export function getEnvProxy() {
  const proxyConfigSpec = {
    httpsPort: {
      env: [
        "ELECTRODE_DEV_HTTPS", // deprecated but still check
        "XARC_DEV_HTTPS"
      ],
      default: -1,
      envMap: { true: 443, false: -1 },
      post: x => (isValidPort(x) ? x : -1)
    },
    adminLogLevel: {
      env: [
        "ELECTRODE_ADMIN_LOG_LEVEL", // deprecated but still check
        "DEV_ADMIN_LOG_LEVEL", // deprecated but still check
        "XARC_ADMIN_LOG_LEVEL"
      ],
      default: 0
    },
    elevated: { env: ["ELECTRODE_DEV_ELEVATED"], default: false }
  };
  return xenvConfig(proxyConfigSpec, {}, { merge });
}
