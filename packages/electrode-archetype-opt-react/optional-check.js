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
  if (lib && lib !== "react") {
    console.log(`electrode-archetype-opt-react: archetype config set reactLib to ${lib} - skipping install`);
    process.exit(1);
  }
} catch (e) {
}

process.exit(0);
