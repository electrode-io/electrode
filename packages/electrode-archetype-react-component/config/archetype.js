"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const pkg = require("../package.json");
const dir = Path.join(__dirname, "..");

//
// Find the host component's dir that's depending on this archetype,
// by checking for the occurence of the first node_modules in the path,
// since process.cwd() may not necessary be accurate potentially.
// Generally CWD is required to be the same, but this will let archetype
// to be certain.
//
function getHostDir() {
  const dir = __dirname;
  const firstNmIdx = dir.indexOf("node_modules");
  if (firstNmIdx > 0) {
    return dir.substr(0, firstNmIdx - 1); // -1 to strip the trailing \ or /
  }
  return process.cwd();
}

const hostDir = getHostDir();

if (process.cwd() !== hostDir) {
  // TODO: add logger from app archetype to component archetype
  console.log(
    "electrode-archetype-react-component: determined your component's dir to be",
    hostDir
  );
}

const userConfig = Object.assign(
  {
    options: { karma: true }
  },
  optionalRequire(Path.join(hostDir, "archetype/config"))
);

module.exports = {
  dir,
  pkg,
  hostDir,
  options: userConfig.options,
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
