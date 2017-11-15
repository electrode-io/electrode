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
const myPkg = require("./package.json");

if (cwd === appDir) {
  try {
    const appPkg = require(Path.join(appDir, "package.json"));
    if (myPkg.name === appPkg.name) {
      process.exit(0);
    }
  } catch (e) {}
}

const name = myPkg.name;
const myTag = "react";

try {
  const config = require(Path.join(appDir, "archetype/config"));
  const lib = config && config.options && config.options.reactLib;
  if (lib && lib !== myTag) {
    console.log(
      `${name}: archetype config set reactLib to ${lib} - skipping install because it's not ${myTag}`
    );
    process.exit(1);
  }
} catch (e) {}

process.exit(0);
