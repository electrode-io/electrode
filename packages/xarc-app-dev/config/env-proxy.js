"use strict";

const xenvConfig = require("xenv-config");
const { merge } = require("lodash");

const proxyConfigSpec = {
  httpsPort: {
    env: ["ELECTRODE_DEV_HTTPS", "XARC_DEV_HTTPS"],
    default: 0,
    envMap: { true: 443, false: 0 },
    post: x => x || 0
  },
  elevated: { env: ["ELECTRODE_DEV_ELEVATED"], default: false }
};

module.exports = xenvConfig(proxyConfigSpec, {}, { merge });
