"use strict";

var Path = require("path");
var PlatformPath = Path[process.platform] || Path;

function getInt(str, def) {
  if (str) {
    const n = parseInt(str, 10);
    if (n !== null && !isNaN(n)) {
      return n;
    }
  }

  return def;
}

module.exports = {
  PlatformPath,
  clientSrcDir: "client",
  devRequire: require("electrode-archetype-react-app-dev/require"),
  // A normal `require.resolve` looks at `package.json:main`. We instead want
  // just the _directory_ of the module. So use heuristic of finding dir of
  // package.json which **must** exist at a predictable location.
  devPath: Path.dirname(require.resolve("electrode-archetype-react-app-dev/package.json")),
  webpack: {
    devHostname: "localhost",
    devPort: getInt(process.env.WEBPACK_DEV_PORT, 2992),
    testPort: getInt(process.env.WEBPACK_TEST_PORT, 3001),
    modulesDirectories: []
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
