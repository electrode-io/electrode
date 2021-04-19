"use strict";

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.APP_SERVER_PORT || process.env.PORT, 10);
  /* istanbul ignore next */
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};

module.exports = {
  plugins: {
    "webpack-dev": {
      module: "@xarc/app-dev/lib/webpack-dev-fastify",
      enable: process.env.WEBPACK_DEV === "true"
    },
    "subapp-server": { options: { insertTokenIds: true, cdn: { enable: true } } }
  },
  connection: {
    host: process.env.HOST,
    address: process.env.HOST_IP || "0.0.0.0",
    port: portFromEnv()
  }
};
