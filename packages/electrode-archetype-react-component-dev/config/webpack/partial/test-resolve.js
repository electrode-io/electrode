"use strict";

const Path = require("path");
// const prodCfg = require("../webpack.config");
const optionalRequire = require("optional-require")(require);
const sinonPkg = optionalRequire.resolve("sinon/pkg/sinon");
const _ = require("lodash");

module.exports = function() {
  // Get Paths to give node_modules by resolving based on assumed presence of
  // `package.json`.
  const _archNodeModules = function(arch) {
    const archDir = Path.dirname(require.resolve(Path.join(arch, "package.json")));
    return Path.join(archDir, "node_modules");
  };

  return {
    resolve: {
      alias: {
        // Allow root import of `src/FOO` from ROOT/src.
        src: Path.resolve("src"),
        sinon: sinonPkg || ""
      },
      modules: [
        process.cwd(),
        "node_modules",
        _archNodeModules("electrode-archetype-react-component"),
        _archNodeModules("electrode-archetype-react-component-dev")
      ],
      extensions: [".js", ".jsx"]
    }
  };
};
