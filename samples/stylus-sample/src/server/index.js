"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");
const support = require("electrode-archetype-react-app/support");

/* eslint-disable global-require */
const staticPathsDecor = require("electrode-static-paths");
const startServer = config => require("electrode-server")(config, [staticPathsDecor()]);
//

support.load().then(() => {
  const config = electrodeConfippet.config;
  return startServer(config);
});
