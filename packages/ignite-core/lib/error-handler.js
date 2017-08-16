"use strict";

const logger = require("./logger");
const chalk = require("chalk");

const errorHandler = function(err, message) {
  if (message) {
    logger.log(chalk.red(`Failed at: ${message}.`));
  };
  logger.log(chalk.red(err));
  return process.exit(1);
};

module.exports = errorHandler;
