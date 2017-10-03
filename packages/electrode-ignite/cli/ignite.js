"use strict";

const chalk = require("chalk");
const igniteCore = require("ignite-core");
const logger = require("ignite-core/lib/logger");

const checkElectrodeIgnite = require("ignite-core/tasks/check-ignite");
const pkg = require("../package.json");

function ignite() {
  if (/^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(pkg.version)) {
    const isCheckIgnite = process.argv[2] === "check-ignite";
    logger.log(chalk.green(`Welcome to electrode-ignite version ${pkg.version}`));
    return checkElectrodeIgnite(
      "oss",
      igniteCore,
      "electrode-ignite",
      !isCheckIgnite,
      isCheckIgnite,
      pkg.version
    );
  } else {
    logger.log(chalk.red(`Your electrode-ignite version@${pkg.version} is invalid.`));
    return process.exit(1);
  }
}

module.exports = ignite;
