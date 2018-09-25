"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const userConfig = Object.assign({}, optionalRequire(Path.resolve("archetype/config")));

const devPkg = require("../package.json");
const devDir = Path.join(__dirname, "..");
const devRequire = require(`../require`);
const configDir = `${devDir}/config`;

// const configDir = `${devDir}/config`;

const archetype = {
  devDir,
  devPkg,
  devRequire,
  config: Object.assign(
    {},
    {
      webpack: `${configDir}/webpack`
    },
    userConfig.configPaths
  )
};

module.exports = archetype;
