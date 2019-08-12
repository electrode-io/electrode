"use strict";

const Fs = require("fs");
const Path = require("path");
const archetype = require("electrode-archetype-react-app/config/archetype");

function checkForCustomWebpackConfig(reqConfigFile) {
  const customFilePath = Path.join(process.cwd(), "webpack.config.js");
  const defaultFile = reqConfigFile || Path.join(archetype.config.webpack, "webpack.config.js");

  return Fs.existsSync(customFilePath) ? customFilePath : defaultFile;
}

module.exports = checkForCustomWebpackConfig;
