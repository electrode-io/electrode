"use strict";

/* eslint-disable global-require */

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");
const { loadRuntimeSupport } = require("@xarc/app");

//
const staticPathsDecor = require("electrode-static-paths");
const electrodeServer = require("electrode-server");

const startServer = (config) => {
  //
  const decor = staticPathsDecor();
  return electrodeServer(config, [decor]);
  //
};

module.exports = () =>
  loadRuntimeSupport({ cssModuleHook: true }).then(() => {
    const config = electrodeConfippet.config;
    return startServer(config);
  });

if (require.main === module) {
  module.exports();
}
