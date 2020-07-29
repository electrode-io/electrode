/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
const archetype = require("@xarc/app-dev/config/archetype")();
const AppMode = archetype.AppMode;
const clientDllConfig = require(Path.resolve(AppMode.src.client, "dll.config.js"));

module.exports = () => ({
  entry: clientDllConfig
});
