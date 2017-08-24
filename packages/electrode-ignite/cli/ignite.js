"use strict";

const chalk = require("chalk");
const igniteCore = require("ignite-core");
const logger = require("ignite-core/lib/logger");

const checkElectrodeIgnite = require("ignite-core/tasks/check-ignite");
const pkg = require("../package.json");

let startTime;

function ignite() {
  logger.log(chalk.green(`Welcome to electrode-ignite version ${pkg.version}`));
  logger.log(chalk.green("Checking latest version available on npm ..."));

  if (!startTime || new Date().getTime() - startTime > 24 * 3600) {
    startTime = undefined;
    checkElectrodeIgnite("oss", igniteCore);
    return;
  } else {
    /* ignite-core */
    igniteCore("oss", process.argv[2]);
    return;
  }
}

module.exports = ignite;
