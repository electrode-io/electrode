"use strict";

const Path = require("path");
const requireAt = require("require-at");
const optionalRequire = require("optional-require")(require);

module.exports = {
  getOptArchetypeRequire(name) {
    const optPkg = optionalRequire.resolve(`${name}/package.json`);
    if (optPkg) {
      return requireAt(Path.dirname(optPkg));
    }
    return undefined;
  }
};
