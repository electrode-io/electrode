/* eslint-disable @typescript-eslint/no-var-requires */
export {};

const Path = require("path");
const { merge } = require("lodash");
const optionalRequire = require("optional-require")(require);

let cachedUserConfig = null;
/**
 * Load user's config under the directory archetype/config
 */
module.exports = function getUserConfig() {
  cachedUserConfig =
    cachedUserConfig || merge({ options: {} }, optionalRequire(Path.resolve("archetype/config")));
  return cachedUserConfig;
};
