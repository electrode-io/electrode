"use strict";

const Path = require("path");
const pkg = require("../package.json");
const optionalRequire = require("optional-require")(require);
const constants = require("./constants");
const utils = require("../lib/utils");
const makeAppMode = require("../lib/app-mode");
const appPkg = require(Path.resolve("package.json"));

function checkOptArchetypeInAppDep(dependencies) {
  const options = Object.keys(dependencies)
    .filter(x => x.startsWith("electrode-archetype-opt-"))
    .reduce((acc, name) => {
      const optPkg = require(name)();
      if (optPkg.pass) {
        acc[optPkg.optionalTagName] = optPkg.expectTag;
      }
      return acc;
    }, {});

  return { options };
}

const userConfigOptions = Object.assign(
  { reactLib: "react", karma: true, sass: false },
  optionalRequire(Path.resolve("archetype/config"), { default: {} }).options,
  checkOptArchetypeInAppDep(appPkg.dependencies).options
);

module.exports = {
  dir: Path.resolve(__dirname, ".."),
  pkg,
  options: userConfigOptions,
  AppMode: makeAppMode(constants.PROD_DIR, userConfigOptions.reactLib),
  prodDir: constants.PROD_DIR,
  eTmpDir: constants.ETMP_DIR,
  prodModulesDir: Path.join(constants.PROD_DIR, "modules"),
  checkUserBabelRc: utils.checkUserBabelRc,
  addArchetypeConfig: config => Object.assign(module.exports, config),
  devArchetypeName: "electrode-archetype-react-app-dev"
};

function checkTopDevArchetype() {
  const devArchName = module.exports.devArchetypeName;
  const topPkg = require(Path.resolve("package.json"));
  // in case this is being used for test/dev in the -dev archetype
  if (topPkg.name === devArchName) {
    return optionalRequire(Path.resolve("config/archetype"));
  } else {
    return optionalRequire(`${devArchName}/config/archetype`);
  }
}

//
// Try to set dev settings, if the dev archetype is available.
// It may have been removed for production deployment.
//
function loadDev() {
  const devArchetype = checkTopDevArchetype();
  if (devArchetype) {
    module.exports.addArchetypeConfig(devArchetype);
  } else {
    module.exports.noDev = true;
  }
}

loadDev();
