"use strict";

const chalk = require("chalk");
const igniteCore = require("ignite-core");
const logger = require("ignite-core/lib/logger");

const checkElectrodeIgnite = require("ignite-core/tasks/check-ignite");
const pkg = require("../package.json");

function ignite() {
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
}

module.exports = ignite;
