"use strict";

const Path = require("path");
const archetypeNodeModules = Path.join(__dirname, "../../", "node_modules");
const archetypeDevNodeModules = Path.join(
  // A normal `require.resolve` looks at `package.json:main`. We instead want
  // just the _directory_ of the module. So use heuristic of finding dir of
  // package.json which **must** exist at a predictable location.
  Path.dirname(require.resolve("electrode-archetype-react-component-dev/package.json")),
  "node_modules"
);

module.exports = {
  resolveLoader: {
    modules: [
      archetypeNodeModules,
      archetypeDevNodeModules,
      "node_modules",
      process.cwd()
    ],
    extensions: [".js", ".jsx"]
  }
}
