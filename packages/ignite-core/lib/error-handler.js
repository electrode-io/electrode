"use strict";

const logger = require("./logger");
const chalk = require("chalk");

const errorHandler = function(err, message) {
  if (message) {
    logger.log(chalk.red(`Failed at: ${message}`));
  }
  logger.log(chalk.red(err));

  // eslint-disable-next-line no-process-exit
  return process.exit(1);
};

module.exports = errorHandler;
