"use strict";

const chalk = require("chalk");
const logger = require("./logger");

const errorHandler = (err, message) => {
  if (message) {
    logger.log(chalk.red(`Failed at: ${message}`));
  }
  logger.log(chalk.red(err));

  // eslint-disable-next-line no-process-exit
  return process.exit(1);
};

module.exports = errorHandler;
