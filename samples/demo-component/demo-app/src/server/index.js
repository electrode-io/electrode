"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");
const staticPathsDecor = require("electrode-static-paths");
const support = require("@xarc/app/support");

support.load().then(() => {
  const config = electrodeConfippet.config;

  require("electrode-server")(config, [staticPathsDecor()]); // eslint-disable-line
});
