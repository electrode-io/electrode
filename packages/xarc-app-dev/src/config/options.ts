/* eslint-disable @typescript-eslint/no-var-requires, max-statements */

import Path from "path";
import makeOptionalRequire from "optional-require";
import * as utils from "../lib/utils"; // really import ESM into single var utils
import _ from "lodash";
import xenvConfig from "xenv-config";
import { makeAppMode } from "@xarc/app";
import { getEnvWebpack } from "./env-webpack";
import { getEnvBabel } from "./env-babel";
import { getEnvKarma } from "./env-karma";

import { PROD_DIR, ETMP_DIR } from "@xarc/app";

const optionalRequire = makeOptionalRequire(require);

export function checkOptArchetypeInAppDep(dependencies, isDev = undefined) {
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

export const getUserConfigOptions = (packageNames, devPackageNames) => {
  return {
    reactLib: "react",
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
export function getDefaultArchetypeOptions() {
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
    prodDir: PROD_DIR,
    eTmpDir: ETMP_DIR,
    prodModulesDir: Path.join(PROD_DIR, "modules"),
    checkUserBabelRc: utils.checkUserBabelRc,
    devArchetypeName: "@xarc/app-dev"
  };
}

/**
 * Legacy way to gather development options from user set env, config files in archetype/config,
 * and internal default values.
 *
 * Now all these can be passed in as a single options object when loading the dev tasks,
 * but still support the legacy ones by using them as default.
 */
export function getDevArchetypeLegacy() {
  const defaultArchetypeConfig = getDefaultArchetypeOptions();
  const userConfig = defaultArchetypeConfig.options;

  const webpack = getEnvWebpack();
  const babel = getEnvBabel();
  const karma = getEnvKarma();

  const { myPkg: devPkg, myDir: devDir } = utils.getMyPkg();
  const configDir = Path.join(devDir, "config");
  const devRequire = require(Path.join(devDir, "require"));

  const config = {
    ...defaultArchetypeConfig,
    devDir,
    devPkg,
    devRequire,
    webpack,
    karma,
    jest: Object.assign({}, userConfig.jest),
    babel,
    config: {
      babel: `${configDir}/babel`,
      eslint: `${configDir}/eslint`,
      karma: `${configDir}/karma`,
      mocha: `${configDir}/mocha`,
      webpack: `${configDir}/webpack`,
      jest: `${configDir}/jest`,
      ...userConfig.configPaths
    },
    prodDir: PROD_DIR,
    eTmpDir: ETMP_DIR,
    AppMode: makeAppMode(PROD_DIR, userConfig.reactLib)
  };

  const topConfigSpec = {
    devOpenBrowser: { env: "ELECTRODE_DEV_OPEN_BROWSER", default: false }
  };

  const typeScriptOption =
    userConfig.typescript === false
      ? {
          babel: { enableTypeScript: userConfig.typescript }
        }
      : {};

  const archetypeConfig = Object.assign(
    _.merge(config, typeScriptOption),
    xenvConfig(topConfigSpec, _.pick(userConfig, Object.keys(topConfigSpec)), { merge: _.merge })
  );

  archetypeConfig.babel.hasMultiTargets =
    Object.keys(archetypeConfig.babel.envTargets)
      .sort()
      .join(",") !== "default,node";

  let AppMode;

  //
  // AppMode could cause circular dependency loading
  // Make it a get property so it's load after this file is processed
  //
  Object.defineProperty(archetypeConfig, "AppMode", {
    get() {
      if (!AppMode) {
        AppMode = makeAppMode(archetypeConfig.prodDir, archetypeConfig.reactLib);
      }

      return AppMode;
    }
  });

  return archetypeConfig;
}
