"use strict";

const Path = require("path");
const pkg = require("../package.json");
const optionalRequire = require("optional-require")(require);
const constants = require("./constants");
const utils = require("../lib/utils");
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
  //
  // Check for any optional archetype in application's devDependencies or dependencies
  //
  process.env.NODE_ENV !== "production" &&
    checkOptArchetypeInAppDep(appPkg.devDependencies).options,
  checkOptArchetypeInAppDep(appPkg.dependencies).options
);

module.exports = {
  dir: Path.resolve(__dirname, ".."),
  pkg,
  options: userConfigOptions,
  prodDir: constants.PROD_DIR,
  eTmpDir: constants.ETMP_DIR,
  prodModulesDir: Path.join(constants.PROD_DIR, "modules"),
  checkUserBabelRc: utils.checkUserBabelRc,
  devArchetypeName: "electrode-archetype-react-app-dev"
};
