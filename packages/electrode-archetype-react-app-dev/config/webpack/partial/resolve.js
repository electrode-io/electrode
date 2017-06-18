"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
const ModuleResolver = require("../plugins/module-resolver");
const _ = require("lodash");

function infernoReactAlias() {
  return AppMode.reactLib === "inferno"
    ? {
        react: "inferno-compat",
        "react-dom": "inferno-compat",
        "react-dom/server": "inferno-compat"
      }
    : {};
}

module.exports = {
  resolve: {
    alias: infernoReactAlias(),
    modules: [(AppMode.isSrc && Path.resolve(AppMode.src.dir)) || null, process.cwd()]
      .concat(archetype.webpack.modulesDirectories)
      .filter(_.identity),
    plugins: [new ModuleResolver("module", undefined, "resolve")],
    extensions: [".js", ".jsx", ".json"]
  }
};
