"use strict";

const _ = require("lodash");
const Path = require("path");
const ModuleResolver = require("electrode-node-resolver/lib/webpack-plugin");
const archetype = require("electrode-archetype-react-app/config/archetype");

module.exports = {
  resolveLoader: {
    symlinks: !archetype.webpack.preserveSymlinks,
    modules: [Path.resolve("lib"), process.cwd()]
      .concat(archetype.webpack.loaderDirectories)
      .filter(_.identity),
    plugins: [new ModuleResolver("module", "resolve", archetype.devDir, undefined)]
  }
};
