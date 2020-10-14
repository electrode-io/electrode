/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";

const ModuleResolver = require("electrode-node-resolver/lib/webpack-plugin");
const identity = require("lodash/identity");
import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = () => {
  const xarcOptions = loadXarcOptions();
  const AppMode = xarcOptions.AppMode;

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

  const { enableTypeScript } = xarcOptions.babel;

  const resolve: any = {
    alias: infernoReactAlias(),
    // https://webpack.js.org/configuration/resolve/#resolve-symlinks
    symlinks: !xarcOptions.webpack.preserveSymlinks,
    // Add a resolver plugin that looks up in the archetype first.
    // Note that webpack will use this first before trying its default
    // plugins and the modules paths specified below
    plugins: [new ModuleResolver("module", "resolve", xarcOptions.devDir, undefined)],
    modules: [Path.resolve(AppMode.src.dir), process.cwd(), "node_modules"]
      .concat(xarcOptions.webpack.modulesDirectories)
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

  return { resolve };
};
