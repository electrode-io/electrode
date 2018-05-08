"use strict";

const optionalRequire = require("optional-require")(require);
const Path = require("path");

module.exports = function(config, type) {
  type = type ? `${type}.` : "";

  const typeFile = Path.resolve(`archetype/config/karma/karma.conf.${type}js`);
  const baseFile = Path.resolve(`archetype/config/karma/karma.conf.js`);

  const userConfig = optionalRequire(typeFile);

  const baseUserConfig = optionalRequire(baseFile);

  if (userConfig) {
    console.log("Applying your karma config", typeFile);
    userConfig(config);
  } else if (baseUserConfig) {
    console.log("Applying your karma config", baseFile);
    baseUserConfig(config);
  }
};
