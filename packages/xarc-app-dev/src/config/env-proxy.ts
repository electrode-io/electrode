import { isValidPort } from "../lib/utils";

/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require("lodash");

module.exports = function getEnvProxy() {
  const xenvConfig = require("xenv-config");

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
};
