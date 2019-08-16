"use strict";

const Fs = require("fs");
const Path = require("path");
const archetype = require("electrode-archetype-react-app/config/archetype");

function checkForCustomWebpackConfig(reqConfigFile) {
  const customFilePath = Path.join(process.cwd(), "webpack.config.js");
  const archetypeFilePath = reqConfigFile || Path.join(archetype.config.webpack, "webpack.config.js");
  const canUseAppProfile = process.env.USE_APP_WEBPACK_CONFIG === "true" && Fs.existsSync(customFilePath);

  return canUseAppProfile ? customFilePath : archetypeFilePath;
}

module.exports = checkForCustomWebpackConfig;
