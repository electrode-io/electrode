"use strict";

var Path = require("path");
var PlatformPath = Path[process.platform] || Path;

module.exports = {
  PlatformPath,
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
  },
  config: {
    babel: `${__dirname}/babel`,
    eslint: `${__dirname}/eslint`,
    istanbul: `${__dirname}/istanbul`,
    karma: `${__dirname}/karma`,
    mocha: `${__dirname}/mocha`,
    webpack: `${__dirname}/webpack`
  }
};
