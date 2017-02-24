"use strict";

const Path = require("path");
const pkg = require("../package.json");
const optionalRequire = require("optional-require")(require);
const constants = require("./constants");
const utils = require("../lib/utils");
const makeAppMode = require("../lib/app-mode");
const archetypeOptions = optionalRequire(Path.resolve("archetype", "config.js"), { default: {} });

module.exports = {
  dir: Path.resolve(__dirname, ".."),
  pkg,
  Path,
  AppMode: makeAppMode(constants.PROD_DIR),
  prodDir: constants.PROD_DIR,
  eTmpDir: constants.ETMP_DIR,
  prodModulesDir: Path.join(constants.PROD_DIR, "modules"),
  checkUserBabelRc: utils.checkUserBabelRc,
  enableBabelPolyfill: true
};

//
// Try to set dev settings, if the dev archetype is available.
// It may have been removed for production deployment.
//
function loadDev() {
  const devPkgFile = "electrode-archetype-react-app-dev/package.json";
  const devPkg = optionalRequire(devPkgFile);
  if (!devPkg) {
    module.exports.noDev = true;
    return;
  }

  const devDir = Path.dirname(require.resolve(devPkgFile));
  const devRequire = require(`${devPkg.name}/require`);
  const configDir = `${devDir}/config`;

  Object.assign(module.exports, {
    devDir,
    devPkg,
    devRequire,
    webpack: Object.assign({}, {
      devHostname: process.env.WEBPACK_HOST || "localhost",
      devPort: utils.getInt(process.env.WEBPACK_DEV_PORT, 2992),
      testPort: utils.getInt(process.env.WEBPACK_TEST_PORT, 3001),
      modulesDirectories: []
    }, archetypeOptions.webpack),
    config: Object.assign({}, {
      babel: `${configDir}/babel`,
      eslint: `${configDir}/eslint`,
      istanbul: `${configDir}/istanbul`,
      karma: `${configDir}/karma`,
      mocha: `${configDir}/mocha`,
      webpack: `${configDir}/webpack`
    }, archetypeOptions.configPaths)
  });
}

loadDev();
