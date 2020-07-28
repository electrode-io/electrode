/* eslint-disable @typescript-eslint/no-var-requires */

const archetypeConfig = require("@xarc/app-dev/config/archetype");
import * as LoadablePlugin from "@loadable/webpack-plugin";

module.exports = function() {
  const archetype = archetypeConfig();
  return {
    plugins: archetype.babel.enableDynamicImport
      ? [new LoadablePlugin({ filename: "../server/loadable-stats.json" })]
      : []
  };
};
