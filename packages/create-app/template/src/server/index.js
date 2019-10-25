"use strict";

const support = require("electrode-archetype-react-app/support");
const electrodeServer = require("electrode-server");

const config = {
  connection: {
    port: parseInt(process.env.APP_SERVER_PORT || process.env.PORT || "3000")
  },
  plugins: {
    "electrode-archetype-react-app-dev": {
      priority: -1,
      enable: process.env.WEBPACK_DEV === "true"
    },
    "subapp-server": {}
  }
};

async function start() {
  await support.load();
  await electrodeServer(config);
}

start();
