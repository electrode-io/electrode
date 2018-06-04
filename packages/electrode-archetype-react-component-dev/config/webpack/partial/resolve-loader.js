"use strict";

const Path = require("path");
const archetype = require("electrode-archetype-react-component/config/archetype");
const archetypeNodeModules = Path.join(archetype.dir, "node_modules");
const archetypeDevNodeModules = Path.join(archetype.devDir, "node_modules");
const ModuleResolver = require("electrode-node-resolver/lib/webpack-plugin");

module.exports = {
  resolveLoader: {
    symlinks: !archetype.webpack.preserveSymlinks,
    modules: [archetypeNodeModules, archetypeDevNodeModules, "node_modules", process.cwd()],
    extensions: [".js", ".jsx"],
    plugins: [new ModuleResolver("module", "resolve", archetype.devDir, undefined)]
  }
};
