"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const pkg = require("../package.json");
const dir = Path.join(__dirname, "..");

module.exports = {
  dir,
  pkg,
  webpack: {
    devHostname: "localhost",
    devPort: 2992,
    testPort: 3001,
    modulesDirectories: ["node_modules"]
  },
  karma: {
    browser: process.env.KARMA_BROWSER === undefined ? "chrome" : process.env.KARMA_BROWSER
  },
  addArchetypeConfig: config => Object.assign(module.exports, config)
};

function checkTopDevArchetype() {
  const devArchName = "electrode-archetype-react-component-dev";
  const topPkg = require(Path.resolve("package.json"));
  // in case this is being used for test/dev in the -dev archetype
  if (topPkg.name === devArchName) {
    return optionalRequire(Path.resolve("config/archetype"));
  } else {
    return optionalRequire(`${devArchName}/config/archetype`);
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
