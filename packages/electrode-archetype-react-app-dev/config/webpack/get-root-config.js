"use strict";

/**
 * This helper attempts to return a root level webpack config for the given file.
 */

var archetype = require("../archetype");
var optionalRequire = require("optional-require")(require);

module.exports = function (rootConfigFileName) {
  return optionalRequire(archetype.Path.resolve(rootConfigFileName)) || {};
};
