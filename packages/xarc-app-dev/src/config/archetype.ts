/* eslint-disable @typescript-eslint/no-var-requires, max-statements */

import { XarcUserConfigs, CreateXarcOptions, defaultCreateXarcOptions } from "../xarc-user-configs";

const getUserConfig = require("./user-config");
const Path = require("path");
const { merge } = require("lodash");
const { getXarcOptions, getMyPkg } = require("../lib/utils");
const constants = require("./constants");
const _ = require("lodash");
const xenvConfig = require("xenv-config");
const makeAppMode = require("@xarc/app/lib/app-mode");
const { getDefaultArchetypeOptions } = require("./options");

let cachedArchetype = null;

module.exports = function getDevArchetype(xarcUserConfig: XarcUserConfigs = {}) {
  syncWebpackProcessEnvVars(xarcUserConfig);
  syncAdditioanlProcessEnv(xarcUserConfig);
  mergeOptionalCheckIntoConfig(xarcUserConfig);

  const xarcOptions = { ...defaultCreateXarcOptions, ...xarcUserConfig };

  if (cachedArchetype) {
    cachedArchetype._fromCache = true;
    // maintained for backwards compatibility
    return cachedArchetype;
  }
  const defaultArchetypeConfig = getDefaultArchetypeOptions(xarcOptions);
  const userConfig: CreateXarcOptions = {
    ...defaultArchetypeConfig.options,
    ...xarcOptions.options
  };

  const webpack = require("./env-webpack")();
  const babel = require("./env-babel")();
  const karma = require("./env-karma")();

  const { myPkg: devPkg, myDir: devDir } = getMyPkg();
  const configDir = Path.join(devDir, "config");
  const devRequire = require(Path.join(devDir, "require"));

  const config = {
    ...defaultArchetypeConfig,
    devDir,
    devPkg,
    devRequire,
    webpack,
    karma,
    jest: Object.assign({}, userConfig.options.jest),
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
    prodDir: constants.PROD_DIR,
    eTmpDir: constants.ETMP_DIR,
    AppMode: makeAppMode(constants.PROD_DIR, xarcUserConfig.options.reactLib)
  };

  const topConfigSpec = {
    devOpenBrowser: { env: "ELECTRODE_DEV_OPEN_BROWSER", default: false }
  };

  const { options } = userConfig;
  const typescriptEnabled = options.typescript === true || babel.enableTypesCript;

  const archetypeConfig = Object.assign(
    _.merge(config, {
      babel: { enableTypeScript: typescriptEnabled }
    }),
    xenvConfig(topConfigSpec, _.pick(userConfig, Object.keys(topConfigSpec)), { merge })
  );

  archetypeConfig.merge;

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

  cachedArchetype = archetypeConfig;

  return cachedArchetype;
};
export const syncWebpackProcessEnvVars = (
  xarcUserConfig: XarcUserConfigs = {}
): XarcUserConfigs => {
  const userVals = xarcUserConfig.webpack || {};
  const userKeys = "webpackDev,devHostname,devPort,cdnProtocol,cdnHostname,cdnPort".split(",");
  const envKeys = `WEBPACK_DEV,WEBPACK_HOST,WEBPACK_PORT,WEBPACK_DEV_CDN_PROTOCOL,WEBPACK_DEV_CDN_HOSTNAME,WEBPACK_DEV_CDN_PORT`.split(
    ","
  );
  userKeys.map((userKey, idx) => {
    const envKey = envKeys[idx];
    if (userVals[userKey]) {
      process.env[envKey] = userVals[userKey];
    }
  });

  return xarcUserConfig;
};

export const syncAdditioanlProcessEnv = (xarcUserConfig: XarcUserConfigs = {}): XarcUserConfigs => {
  [
    "KARMA_BROWSER",
    "SERVER_ES6",
    "ELECTRODE_DEV_OPEN_BROWSER",
    "_ELECTRODE_DEV_",
    "STATIC_FILES",
    "ENABLE_KARMA_COV",
    "NODE_ENV",
    "WEBPACK_DEV",
    "HOST",
    "PORT"
  ].map(key => {
    if (xarcUserConfig[key]) {
      process.env[key] = xarcUserConfig[key];
    }
  });

  return xarcUserConfig;
};

export const mergeOptionalCheckIntoConfig = (
  xarcUserConfig: XarcUserConfigs = {}
): XarcUserConfigs => {
  const configs = getUserConfig();
  xarcUserConfig.options = { ...configs.options, ...xarcUserConfig.options };
  return xarcUserConfig;
};
