"use strict";

const Path = require("path");
const devPath = Path.join(__dirname, "..");

module.exports = {
  devDir: devPath,
  devPath,
  devRequire: require("../require"),
  webpack: {
    devHostname: "localhost",
    devPort: 2992,
    testPort: 3001,
    modulesDirectories: ["node_modules"]
  }
};
