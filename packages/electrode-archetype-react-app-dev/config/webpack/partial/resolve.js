"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
const ModuleResolver = require("electrode-node-resolver/lib/webpack-plugin");
const identity = require("lodash/identity");

function infernoReactAlias() {
  return AppMode.reactLib === "inferno"
    ? {
        react: "inferno-compat",
        "react-dom": "inferno-compat",
        "react-dom/server": "inferno-compat"
      }
    : {};
}

const { enableTypeScript } = archetype.babel;

module.exports = {
  resolve: {
    alias: infernoReactAlias(),
    // https://webpack.js.org/configuration/resolve/#resolve-symlinks
    symlinks: !archetype.webpack.preserveSymlinks,
    // Add a resolver plugin that looks up in the archetype first.
    // Note that webpack will use this first before trying its default
    // plugins and the modules paths specified below
    plugins: [new ModuleResolver("module", "resolve", archetype.devDir, undefined)],
    modules: [
      (AppMode.isSrc && Path.resolve(AppMode.src.dir)) || null,
      process.cwd(),
      "node_modules"
    ]
      .concat(archetype.webpack.modulesDirectories)
      .filter(identity),
    extensions: [".js", ".jsx", ".json"].concat(enableTypeScript && [".ts", ".tsx"]).filter(x => x)
  }
};
