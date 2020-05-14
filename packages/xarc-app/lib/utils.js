"use strict";

const Path = require("path");
const Fs = require("fs");
const pkg = require("../package.json");
require("../typedef");

function checkUserBabelRc() {
  const user = Path.resolve(".babelrc");
  if (Fs.existsSync(user)) {
    const userRc = JSON.parse(Fs.readFileSync(user).toString());
    if (
      Object.keys(userRc).length === 1 &&
      typeof userRc.extends === "string" &&
      userRc.extends.indexOf(pkg.name) >= 0
    ) {
      return "extendsOnly";
    } else {
      return "custom";
    }
  }

  return false;
}

const defaultCreateOptions = {
  electrodePackages: [],
  electrodePackagesDev: [],
  enableFeatures: true,
  assertNoGulpExecution: true,
  assertDevArchetypePresent: true
};

/**
 * @param {CreateXarcOptions} [userXarcOptions] user provided options to
 * configurearchetype generation
 * @returns {CreateXarcOptions} CreateXarcOptions
 */
const getXarcOptions = userXarcOptions => ({ ...defaultCreateOptions, ...userXarcOptions });

module.exports = {
  getXarcOptions,
  checkUserBabelRc
};
