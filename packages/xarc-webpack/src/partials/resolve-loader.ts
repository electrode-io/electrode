/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";

const identity = require("lodash/identity");
const ModuleResolver = require("electrode-node-resolver/lib/webpack-plugin");
import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = () => {
  const xarcOptions = loadXarcOptions();

  return {
    resolveLoader: {
      symlinks: !xarcOptions.webpack.preserveSymlinks,
      modules: [Path.resolve("lib"), process.cwd()]
        .concat(xarcOptions.webpack.loaderDirectories)
        .filter(identity),
      plugins: [new ModuleResolver("module", "resolve", xarcOptions.devDir, undefined)]
    }
  };
};
