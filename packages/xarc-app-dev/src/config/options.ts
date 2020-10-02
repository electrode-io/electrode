/* eslint-disable @typescript-eslint/no-var-requires */
export {};

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const constants = require("./constants");
const utils = require("../lib/utils");

function checkOptArchetypeInAppDep(dependencies, isDev = undefined) {
  const options = dependencies
    .filter(x => x.startsWith("electrode-archetype-opt-") || x.startsWith("@xarc/opt-"))
    .reduce((acc, name) => {
      //
      // In dev mode, when all dev deps are installed, we can safely load
      // opt packages and find the feature flag name to enable.
      //
      // In production mode, dep could've been pruned for prod, and dev only
      // opt packages would not even exist.
      // note 1: we don't expect dev only opt packages to have any effect
      //   in production runs.
      //
      const optPkg = optionalRequire(name, {
        notFound(err) {
          //
          // if in dev mode, or if in production but looking for
          //  opt pkg _not_ within devDependencies:
          // then always expect opt pkg to be installed.
          //
          if (process.env._ELECTRODE_DEV_ || (process.env.NODE_ENV === "production" && !isDev)) {
            throw err;
          }
        }
      });

      if (optPkg) {
        const optPkgFlag = optPkg();
        if (optPkgFlag.pass) {
          acc[optPkgFlag.optionalTagName] = optPkgFlag.expectTag;
        }
      }
      return acc;
    }, {});

  return { options };
}

const getUserConfigOptions = (packageNames, devPackageNames) => {
  return {
    reactLib: "react",
    karma: true,
    sass: false,
    ...optionalRequire(Path.resolve("archetype/config"), { default: {} }).options,
    //
    // Check for any optional archetype in application's devDependencies or dependencies
    //
    ...checkOptArchetypeInAppDep(devPackageNames, true).options,
    ...checkOptArchetypeInAppDep(packageNames).options
  };
};

/**
 * Get default xarc options
 *
 * @returns default options
 */
function getDefaultArchetypeOptions() {
  //
  // try to find application's package.json so we can check its dependencies
  // and devDependencies for modules that enable add on features.
  // Basically any package named electrode-archetype-opt-* or @xarc/opt-*
  //
  const appPkg = optionalRequire(Path.resolve("package.json")) || {
    dependencies: {},
    devDependencies: {}
  };
  const packageNames = Object.keys(appPkg.dependencies);
  const devPackageNames = Object.keys(appPkg.devDependencies);

  const { myPkg: pkg } = utils.getMyPkg();

  return {
    dir: Path.resolve(__dirname, ".."),
    pkg,
    options: getUserConfigOptions(packageNames, devPackageNames),
    prodDir: constants.PROD_DIR,
    eTmpDir: constants.ETMP_DIR,
    prodModulesDir: Path.join(constants.PROD_DIR, "modules"),
    checkUserBabelRc: utils.checkUserBabelRc,
    devArchetypeName: "@xarc/app-dev"
  };
}

module.exports = {
  checkOptArchetypeInAppDep,
  getUserConfigOptions,
  getDefaultArchetypeOptions
};
