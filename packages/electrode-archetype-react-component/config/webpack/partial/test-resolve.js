"use strict";

var Path = require("path");
var prodCfg = require("../webpack.config");
var archDevRequire = require("electrode-archetype-react-component-dev/require");
var sinonPkg = archDevRequire.resolve("sinon/pkg/sinon");
var _ = archDevRequire("lodash");

module.exports = function() {
  // Get Paths to give node_modules by resolving based on assumed presence of
  // `package.json`.
  var _archNodeModules = function(arch) {
    var archDir = Path.dirname(require.resolve(Path.join(arch, "package.json")));
    return Path.join(archDir, "node_modules");
  };

  return {
    resolve: _.merge({}, prodCfg.resolve, {
      alias: {
        // Allow root import of `src/FOO` from ROOT/src.
        src: Path.join(process.cwd(), "src"),
        sinon: sinonPkg
      },
      modules: [
        "node_modules",
        _archNodeModules("electrode-archetype-react-component"),
        _archNodeModules("electrode-archetype-react-component-dev")
      ]
    })
  };
};
