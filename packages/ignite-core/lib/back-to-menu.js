"use strict";

const chalk = require("chalk");
const logger = require("../lib/logger");

const ARGV = 2;

const backToMenu = function(type, igniteCore, showHint) {
  if (showHint) {
    logger.log(
      chalk.green("Return to the main menu. Please choose your next task:")
    );
  }

  if (type && igniteCore) {
    igniteCore(type, process.argv[ARGV]);
    return;
  } else {
    return process.exit(0); // eslint-disable-line
  }
};

module.exports = backToMenu;
