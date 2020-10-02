/* eslint-disable @typescript-eslint/no-var-requires, max-statements, no-console */

import { XarcOptions } from "./opt2/xarc-options";

const Path = require("path");
const { merge } = require("lodash");
const { getMyPkg } = require("../lib/utils");
const constants = require("./constants");

const Fs = require("fs");
const _ = require("lodash");
const xenvConfig = require("xenv-config");
const makeAppMode = require("@xarc/app/lib/app-mode");
const { getDefaultArchetypeOptions } = require("./options");
const getEnvProxy = require("./env-proxy");

let cachedArchetype = null;

function getDevArchetypeLegacy() {
  const defaultArchetypeConfig = getDefaultArchetypeOptions();
  const userConfig = defaultArchetypeConfig.options;

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
    prodDir: constants.PROD_DIR,
    eTmpDir: constants.ETMP_DIR,
    AppMode: makeAppMode(constants.PROD_DIR, userConfig.reactLib)
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
    xenvConfig(topConfigSpec, _.pick(userConfig, Object.keys(topConfigSpec)), { merge })
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

function saveArchetypeConfig(config) {
  const filename = ".etmp/xarc-options.json";
  const copy = { ...config, pkg: undefined, devPkg: undefined };
  let existStr;

  try {
    existStr = Fs.readFileSync(filename, "utf-8");
  } catch (err) {
    //
  }

  const str = JSON.stringify(copy, null, 2);
  if (str !== existStr) {
    try {
      Fs.writeFileSync(filename, str);
    } catch (err) {
      console.error(
        `Unable to save development options to ${filename} - this will cause other failures.\n`,
        err
      );
    }
  }
}

module.exports = function getDevArchetype(user: XarcOptions = {}) {
  if (cachedArchetype) {
    cachedArchetype._fromCache = true;
    // maintained for backwards compatibility
    return cachedArchetype;
  }

  // first get legacy configs
  const legacy = getDevArchetypeLegacy();

  const proxy = getEnvProxy();

  // proxy config was not set in legacy, so add to top level here
  _.merge(legacy, proxy);

  // merge user.webpackOptions into legacy.webpack
  _.merge(legacy.webpack, user.webpackOptions);
  // merge user.babelOptions into legacy.babel
  _.merge(legacy.babel, user.babelOptions);
  // merge user.addOnFeatures into legacy.options
  _.merge(legacy.options, user.addOnFeatures);
  // merge the rest into top level
  _.merge(legacy, {
    ...user,
    webpackOptions: undefined,
    babelOptions: undefined,
    addOnFeatures: undefined
  });

  saveArchetypeConfig(legacy);

  cachedArchetype = legacy;

  return cachedArchetype;
};
