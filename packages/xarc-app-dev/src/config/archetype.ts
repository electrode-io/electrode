const Path = require("path");
const { merge } = require("lodash");
const { getXarcOptions, getMyPkg } = require("../lib/utils");
const constants = require("./constants");

const _ = require("lodash");
const xenvConfig = require("xenv-config");
const makeAppMode = require("@xarc/app/lib/app-mode");
const { getDefaultArchetypeOptions } = require("./options");

let cachedArchetype = null;

module.exports = function getDevArchetype(createXarcOptions) {
  if (cachedArchetype) {
    cachedArchetype._fromCache = true;
    // maintained for backwards compatibility
    return cachedArchetype;
  }

  const xarcOptions = getXarcOptions(createXarcOptions);
  const defaultArchetypeConfig = getDefaultArchetypeOptions(xarcOptions);
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

  const { options } = userConfig;

  const typeScriptOption =
    options.typescript === false
      ? {
          babel: { enableTypeScript: options.typescript }
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

  cachedArchetype = archetypeConfig;

  return cachedArchetype;
};
