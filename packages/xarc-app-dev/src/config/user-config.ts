"use strict";

const Path = require("path");
const { merge } = require("lodash")
const optionalRequire = require("optional-require")(require);

let cachedUserConfig = null
module.exports = function getUserConfig () {
  cachedUserConfig = cachedUserConfig || merge({ options: {} }, optionalRequire(Path.resolve("archetype/config")));
  return cachedUserConfig
}
