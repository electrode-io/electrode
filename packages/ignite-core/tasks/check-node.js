"use strict";

const chalk = require("chalk");
const errorHandler = require("../lib/error-handler");
const logger = require("../lib/logger");
const readline = require("readline");
const xsh = require("xsh");
const semverComp = require("../lib/semver-comp");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const checkNode = function(type, igniteCore, spinner) {
  spinner.start();
  return new Promise((resolve, reject) => {
    return xsh
      .exec(true, "npm -v")
      .then(function(npmVersion) {
        const nodeVersion = process.version.slice(1);
        npmVersion = npmVersion.stdout.slice(0, -1);
        const nodePath = process.execPath;
        const nodeVer6Ret = semverComp(nodeVersion, "6.0.0");
        const npmVer3Ret = semverComp(npmVersion, "3.0.0");

        spinner.stop();

        logger.log(chalk.cyan(`Your Node version is: ${nodeVersion}`));
        logger.log(chalk.cyan(`Your npm version is: ${npmVersion}`));
        logger.log(chalk.cyan(`Your Node binary path is: ${nodePath}`));

        if (nodeVer6Ret >= 0) {
          logger.log(
            chalk.yellow(
              `You are using Node version ${nodeVersion}. Electrode should work for you.`
            )
          );
        } else {
          logger.log(
            chalk.yellow(
              `Your Node version is: ${nodeVersion}. We recommend use Node LTS version 6.`
            )
          );
        }

        if (npmVer3Ret >= 0) {
          logger.log(
            chalk.yellow(
              `You are using npm version ${npmVersion}. Electrode should work for you.`
            )
          );
        } else {
          logger.log(
            chalk.yellow(
              `Your npm version is: ${npmVersion}. Electrode requires npm version 3 and up.`
            )
          );
        }

        rl.close();

        if (type && igniteCore) {
          logger.log(chalk.green("Please choose your next task:"));
          igniteCore(type);
        }

        resolve(true);
      })
      .catch(err => errorHandler(err, "Failed at: Fetching npm version."));
  });
};

module.exports = checkNode;
