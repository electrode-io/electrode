"use strict";

const Path = require("path");
const pkg = require("../package.json");
const optionalRequire = require("optional-require")(require);
const userConfig = Object.assign({}, optionalRequire(Path.resolve("archetype/config")));

const archetype = {
  dir: Path.resolve(__dirname, ".."),
  pkg,
  options: userConfig.options,
  addArchetypeConfig: config => Object.assign(archetype, config)
};

module.exports = archetype;

function checkTopDevArchetype() {
  const devArchName = "electrode-archetype-webpack-dll-dev";
  const topPkg = require(Path.resolve("package.json"));
  // in case this is being used for test/dev in the -dev archetype
  if (topPkg.name === devArchName) {
    return optionalRequire(Path.resolve("config/archetype"));
  } else {
    const devArch = `${devArchName}/config/archetype`;
    return optionalRequire(devArch);
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
