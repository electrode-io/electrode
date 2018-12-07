"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const userConfig = Object.assign({}, optionalRequire(Path.resolve("archetype/config")));

const devPkg = require("../package.json");
const devDir = Path.join(__dirname, "..");
const devRequire = require(`../require`);
const configDir = `${devDir}/config`;

const xenvConfig = devRequire("xenv-config");

const webpackConfigSpec = {
  devHostname: { env: ["WEBPACK_HOST", "WEBPACK_DEV_HOST"], default: "localhost" },
  devPort: { env: "WEBPACK_DEV_PORT", default: 2992 },
  testPort: { env: "WEBPACK_TEST_PORT", default: 3001 },
  preserveSymlinks: { env: ["WEBPACK_PRESERVE_SYMLINKS", "NODE_PRESERVE_SYMLINKS"], default: false }
};

module.exports = {
  devDir,
  devPath: devDir,
  devRequire: require("../require"),
  devPkg,
  webpack: xenvConfig(webpackConfigSpec, userConfig.webpack),
  jest: Object.assign({}, userConfig.jest)
};
