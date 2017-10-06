"use strict";

const chalk = require("chalk");
const xsh = require("xsh");
const logger = require("../util/logger");
const semverCompare = require("semver-compare");

const Lib = {};

module.exports = Object.assign(Lib, {
  getNpmVersion: function getNpmVersion() {
    return xsh.exec(true, "npm -v").then(r => r.stdout.slice(0, -1));
  },

  node: function node(version) {
    const message =
      semverCompare(version, "6.0.0") >= 0
        ? `Electrode should work for you.`
        : `We recommend use Node LTS version 6.`;
    logger.log(chalk.yellow(`You are using Node version ${version}. ${message}`), "\n");
  },

  npm: function npm(version) {
    const message =
      semverCompare(version, "3.0.0") >= 0
        ? `Electrode should work for you.`
        : `Electrode requires npm version 3 and up.`;
    logger.log(chalk.yellow(`You are using npm version ${version}. ${message}`));
  }
});
