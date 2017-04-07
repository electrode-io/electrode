"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const archetypeOptions = optionalRequire(Path.resolve("archetype", "config"), { default: {} });

const devPkg = require("../package.json");
const devDir = Path.join(__dirname, "..");
const devRequire = require(`../require`);
const configDir = `${devDir}/config`;

const utils = require("kununu-electrode-archetype-react-app/lib/utils");

module.exports = {
  devDir,
  devPkg,
  devRequire,
  webpack: Object.assign({}, {
    devHostname: process.env.WEBPACK_HOST || "localhost",
    devPort: utils.getInt(process.env.WEBPACK_DEV_PORT, 2992),
    testPort: utils.getInt(process.env.WEBPACK_TEST_PORT, 3001),
    modulesDirectories: [],
    enableBabelPolyfill: false
  }, archetypeOptions.webpack),
  config: Object.assign({}, {
    babel: `${configDir}/babel`,
    eslint: `${configDir}/eslint`,
    istanbul: `${configDir}/istanbul`,
    karma: `${configDir}/karma`,
    mocha: `${configDir}/mocha`,
    webpack: `${configDir}/webpack`
  }, archetypeOptions.configPaths)
};
