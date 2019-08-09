"use strict";

const Fs = require("fs");
const Path = require("path");

function checkForCustomWebpackConfig(reqConfigFile) {
  const customFilePath = Path.join(process.cwd(), "webpack.config.js");
  const defaultFile = reqConfigFile || Path.join("../", "webpack.config.js");

  return Fs.existsSync(customFilePath) ? customFilePath : defaultFile;
}

module.exports = checkForCustomWebpackConfig;
