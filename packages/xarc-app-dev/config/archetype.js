"use strict";

const Path = require("path");
const { merge } = require("lodash");

const devPkg = require("../package.json");
const devDir = Path.join(__dirname, "..");
const devRequire = require(`../require`);
const configDir = Path.join(devDir, 'config');
const _ = require("lodash");
const xenvConfig = require("xenv-config");

let cachedArchetype = null;
module.exports = function getDevArchetype() {
  if (cachedArchetype) {
    cachedArchetype._fromCache = true;
    // maintained for backwards compatibility
    return cachedArchetype;
  }
  const userConfig = require("./user-config")();
  const webpack = require("./env-webpack")();
  const babel = require("./env-babel")();
  const karma = require("./env-karma")();
  const config = {
    devDir,
    devPkg,
    devRequire,
    webpack,
    karma,
    jest: Object.assign({}, userConfig.jest),
    babel,
    config: Object.assign(
      {},
      {
        babel: `${configDir}/babel`,
        eslint: `${configDir}/eslint`,
        karma: `${configDir}/karma`,
        mocha: `${configDir}/mocha`,
        webpack: `${configDir}/webpack`,
        jest: `${configDir}/jest`
      },
      userConfig.configPaths
    )
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

  const nextArchetype = Object.assign(
    _.merge(config, typeScriptOption),
    xenvConfig(topConfigSpec, _.pick(userConfig, Object.keys(topConfigSpec)), { merge })
  );

  nextArchetype.babel.hasMultiTargets =
    Object.keys(nextArchetype.babel.envTargets)
      .sort()
      .join(",") !== "default,node";
  cachedArchetype = nextArchetype
  return cachedArchetype
}
