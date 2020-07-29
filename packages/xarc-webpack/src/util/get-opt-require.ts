/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Figure out if an opt add-on is installed.  If so, return a require that's binded
 * to its location.
 *
 */

import * as Path from "path";
const requireAt = require("require-at");
const optionalRequire = require("optional-require")(require);

const invalidRequire = () => false;
invalidRequire.resolve = () => false;
invalidRequire.invalid = true;

module.exports = function getOptRequire(name) {
  const optPkg = optionalRequire.resolve(`${name}/package.json`);
  if (optPkg) {
    return requireAt(Path.dirname(optPkg));
  }
  return invalidRequire;
};
