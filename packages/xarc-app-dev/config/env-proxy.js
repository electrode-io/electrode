"use strict";
const { merge } = require("lodash");

let cachedEnvProxy = null
module.exports = function getEnvProxy () {
  const xenvConfig = require("xenv-config");

  const proxyConfigSpec = {
    httpsPort: {
      env: ["ELECTRODE_DEV_HTTPS", "XARC_DEV_HTTPS"],
      default: 0,
      envMap: { true: 443, false: 0 },
      post: x => x || 0
    },
    adminLogLevel: {
      env: ["ELECTRODE_ADMIN_LOG_LEVEL", "DEV_ADMIN_LOG_LEVEL", "XARC_ADMIN_LOG_LEVEL"],
      default: 0
    },
    elevated: { env: ["ELECTRODE_DEV_ELEVATED"], default: false }
  };
  cachedEnvProxy = cachedEnvProxy || xenvConfig(proxyConfigSpec, {}, { merge });
  return cachedEnvProxy
}
