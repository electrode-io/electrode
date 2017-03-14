"use strict";

const Path = require("path");

const cwd = process.cwd();

function findAppDir() {
  if (cwd.indexOf("node_modules") > 0) {
    const splits = cwd.split("node_modules");
    return Path.dirname(Path.join(splits[0], "x")); // remove trailing slash
  }
  return cwd;
}

const appDir = findAppDir();

if (cwd === appDir) {
  try {
    const myPkg = require("./package.json");
    const appPkg = require(Path.join(appDir, "package.json"));
    if (myPkg.name === appPkg.name) {
      process.exit(0);
    }
  } catch (e) {
  }
}

try {
  const config = require(Path.join(appDir, "archetype/config"));
  const lib = config && config.options && config.options.reactLib;
  if (lib === "inferno") {
    console.log(`electrode-archetype-opt-inferno: archetype config set reactLib to ${lib} - installing`);
    process.exit(0);
  } else {
    console.log(`electrode-archetype-opt-inferno: archetype config set reactLib to ${lib} - skipping install`);
  }
} catch (e) {
  console.log("electrode-archetype-opt-inferno: no archetype config found - skipping install");
}

process.exit(1);
