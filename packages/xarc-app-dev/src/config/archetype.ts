/* eslint-disable @typescript-eslint/no-var-requires, max-statements */

import { XarcUserConfigs } from "./xarc-user-configs";
import {
  syncAdditionalEnvVars,
  syncWebpackProcessEnvVars,
  mergeOptionalCheckIntoConfig
} from "./archetype-compat";
const Path = require("path");
const { getXarcOptions, getMyPkg, checkUserBabelRc } = require("../lib/utils");
const constants = require("./constants");

const makeAppMode = require("@xarc/app/lib/app-mode");

let cachedArchetype = null;

module.exports = function getDevArchetype(xarcUserConfig: XarcUserConfigs = {}) {
  syncWebpackProcessEnvVars(xarcUserConfig);
  syncAdditionalEnvVars(xarcUserConfig);
  mergeOptionalCheckIntoConfig(xarcUserConfig);

  const webpack = { ...require("./env-webpack")(), ...xarcUserConfig.webpack };
  const babel = { ...require("./env-babel")(), ...xarcUserConfig.babel };
  const karma = { ...require("./env-karma")(), ...xarcUserConfig.karma };

  const { myPkg: devPkg, myDir: devDir } = getMyPkg();
  const configDir = Path.join(devDir, "config");
  const devRequire = require(Path.join(devDir, "require"));

  const archetypeConfig = {
    devDir,
    devPkg,
    devRequire,
    webpack,
    karma,
    babel,
    config: {
      babel: `${configDir}/babel`,
      eslint: `${configDir}/eslint`,
      karma: `${configDir}/karma`,
      mocha: `${configDir}/mocha`,
      webpack: `${configDir}/webpack`,
      jest: `${configDir}/jest`,
      ...xarcUserConfig.configPaths
    },
    prodDir: constants.PROD_DIR,
    eTmpDir: constants.ETMP_DIR,
    prodModulesDir: Path.join(constants.PROD_DIR, "modules"),
    checkUserBabelRc: checkUserBabelRc,
    devArchetypeName: "@xarc/app-dev",
    options: {
      flow: false,
      eslint: true,
      karma: false,
      jest: false,
      mocha: true,
      reactLib: "react",
      typescript: true,
      sass: false,
      ...(xarcUserConfig.options || {})
    },
    devOpenBrowser: { env: "ELECTRODE_DEV_OPEN_BROWSER", default: false }
  };
  archetypeConfig.babel.enableTypeScript =
    archetypeConfig.options.typescript === true || babel.enableTypeScript;

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
        AppMode = makeAppMode(archetypeConfig.prodDir, archetypeConfig.options.reactLib);
      }
      return AppMode;
    }
  });

  cachedArchetype = archetypeConfig;

  return cachedArchetype;
};
