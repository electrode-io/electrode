/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";

const archetypeConfig = require("@xarc/app-dev/config/archetype");

module.exports = () => {
  const AppMode = archetypeConfig().AppMode;
  const clientDllConfig = require(Path.resolve(AppMode.src.client, "dll.config.js"));

  return {
    entry: clientDllConfig
  };
};
