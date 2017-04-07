"use strict";

const optionalRequire = require("optional-require")(require);
const Path = require("path");
const _ = require("lodash");
const assert = require("assert");

module.exports = function loadUserConfig(filename, config, settings) {
  const filePath = Path.resolve("archetype/config/karma", filename);
  const userConfig = optionalRequire(filePath);

  if (userConfig) {
    assert(_.isFunction(userConfig), `${filePath} must export a function`);
    userConfig(config, settings);
  } else {
    config.set(settings);
  }
};
