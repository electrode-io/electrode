"use strict";

function getInt(str, def) {
  if (str) {
    const n = parseInt(str, 10);
    if (n !== null && !isNaN(n)) {
      return n;
    }
  }

  return def;
}

function checkUserBabelRc() {
  const user = Path.resolve(".babelrc");
  if (Fs.existsSync(user)) {
    const userRc = JSON.parse(Fs.readFileSync(user).toString());
    if (Object.keys(userRc).length === 1 && typeof userRc.extends === "string" &&
      userRc.extends.indexOf(pkg.name) >= 0) {
      return "extendsOnly";
    } else {
      return "custom";
    }
  }

  return false;
}

module.exports = {
  getInt,
  checkUserBabelRc
};
