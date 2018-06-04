"use strict";

const Path = require("path");
const archetype = require("electrode-archetype-react-component/config/archetype");
const archetypeNodeModules = Path.join(archetype.dir, "node_modules");
const archetypeDevNodeModules = Path.join(archetype.devDir, "node_modules");
const ModuleResolver = require("electrode-node-resolver/lib/webpack-plugin");

module.exports = {
  resolve: {
    symlinks: !archetype.webpack.preserveSymlinks,
    plugins: [new ModuleResolver("module", "resolve", archetype.devDir, undefined)],
    modules: [archetypeNodeModules, archetypeDevNodeModules, "node_modules", process.cwd()],
    extensions: [".js", ".jsx"]
  }
};
