"use strict";

const archetype = require("@xarc/app-dev/config/archetype")();
const AppMode = archetype.AppMode;
const Path = require("path");
const ModuleResolver = require("electrode-node-resolver/lib/webpack-plugin");
const identity = require("lodash/identity");

function infernoReactAlias() {
  switch (AppMode.reactLib) {
    case "inferno":
      return {
        react: "inferno-compat",
        "react-dom": "inferno-compat",
        "react-dom/server": "inferno-compat"
      };
    case "preact":
      return {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/server": "preact/compat"
      };
    default:
      return {};
  }
}

const { enableTypeScript } = archetype.babel;

const resolve = {
  alias: infernoReactAlias(),
  // https://webpack.js.org/configuration/resolve/#resolve-symlinks
  symlinks: !archetype.webpack.preserveSymlinks,
  // Add a resolver plugin that looks up in the archetype first.
  // Note that webpack will use this first before trying its default
  // plugins and the modules paths specified below
  plugins: [new ModuleResolver("module", "resolve", archetype.devDir, undefined)],
  modules: [Path.resolve(AppMode.src.dir), process.cwd(), "node_modules"]
    .concat(archetype.webpack.modulesDirectories)
    .filter(identity),
  extensions: [".js", ".jsx", ".json"].concat(enableTypeScript && [".ts", ".tsx"]).filter(x => x)
};

//
// Prioritize `module` over `browser` field in package.json
//
// This really should be the default for all to make treeshaking work
// but since it will likely be a breaking change, it's only done for subapps for now
// it will be done in next major version as default for all
// https://github.com/electrode-io/electrode/issues/1491
//
if (AppMode.hasSubApps) {
  resolve.mainFields = ["module", "browser", "main"];
}

module.exports = () => ({ resolve });
