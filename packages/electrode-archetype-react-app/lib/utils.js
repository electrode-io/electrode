"use strict";

const Path = require("path");
const Fs = require("fs");
const pkg = require("../package.json");

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

module.exports = {
  checkUserBabelRc
};
