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
    /*
     * Note:
     * electrode-ignite is facing an incorrect installation issue under npm v5.4.x
     */
    let message = "";
    if (semverCompare(version, "5.4.0") >= 0 && semverCompare(version, "5.5.0") < 0) {
      message = `Electrode should work for you.` +
        ` Note: Please avoid npm version v5.4.x,` +
        ` it may cause an incorrect installation while using electrode ignite.`;
    } else {
      message =
        semverCompare(version, "3.0.0") >= 0
          ? `Electrode should work for you.`
          : `Electrode requires npm version 3 and up.`;
    }
    logger.log(chalk.yellow(`You are using npm version ${version}. ${message}`));
  }
});
