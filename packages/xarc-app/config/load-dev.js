"use strict";

//
// Load options from the dev archetype
//

const Path = require("path");
const optionalRequire = require("optional-require")(require);

function checkTopDevArchetype(devArchName) {
  const topPkg = optionalRequire(Path.resolve("package.json"));
  if (topPkg && topPkg.name === devArchName) {
    // In case @xarc/app is being used for test/dev in the -dev archetype
    // resolve config/archetype in @xarc/app-dev's own dir
    return optionalRequire(Path.resolve("config/archetype"));
  } else {
    return optionalRequire(`${devArchName}/config/archetype`);
  }
}

//
// Try to set dev settings, if the dev archetype is available.
// It may have been removed for production deployment.
function loadDev(options, createXarcOptions) {
  const devOptions = checkTopDevArchetype(options.devArchetypeName);
  if (devOptions) {
    Object.assign(options, devOptions(createXarcOptions));
  } else {
    options.noDev = true;
  }

  return options;
}

module.exports = loadDev;
