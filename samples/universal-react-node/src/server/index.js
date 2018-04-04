"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const support = require("electrode-archetype-react-app/support");
const electrodeConfippet = require("electrode-confippet");
const electrodeServer = require("electrode-server");
const staticPathsDecor = require("electrode-static-paths");

require.extensions[".css"] = () => {
  return;
};

support.load({
  cssModuleHook: true
}).then(() => {
  return electrodeServer(electrodeConfippet.config, [staticPathsDecor()]);
});
