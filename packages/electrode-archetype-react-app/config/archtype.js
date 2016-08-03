"use strict";

var Path = require("path");

module.exports = {
  devRequire: require("@walmart/electrode-archetype-react-app-dev/require"),
  // A normal `require.resolve` looks at `package.json:main`. We instead want
  // just the _directory_ of the module. So use heuristic of finding dir of
  // package.json which **must** exist at a predictable location.
  devPath: Path.dirname(require.resolve("@walmart/electrode-archetype-react-app-dev/package.json")),
  webpack: {
    devHostname: "localhost",
    devPort: 2992,
    testPort: 3001,
    modulesDirectories: ["node_modules/@walmart"]
  }
};
