"use strict";

/**
 * This helper attempts to return a root level webpack config for the given file.
 */

const archetype = require("../archetype");
const optionalRequire = require("optional-require")(require);

module.exports = function (rootConfigFileName) {
  return optionalRequire(archetype.Path.resolve(rootConfigFileName)) || {};
};
