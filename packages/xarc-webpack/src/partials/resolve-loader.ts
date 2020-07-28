/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";

const identity = require("lodash/identity");
const ModuleResolver = require("electrode-node-resolver/lib/webpack-plugin");
const archetype = require("@xarc/app-dev/config/archetype")();

module.exports = () => ({
  resolveLoader: {
    symlinks: !archetype.webpack.preserveSymlinks,
    modules: [Path.resolve("lib"), process.cwd()]
      .concat(archetype.webpack.loaderDirectories)
      .filter(identity),
    plugins: [new ModuleResolver("module", "resolve", archetype.devDir, undefined)]
  }
});
