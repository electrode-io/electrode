"use strict";

const chalk = require("chalk");
const readline = require("readline");
const xsh = require("xsh");

const errorHandler = require("../lib/error-handler");
const logger = require("../lib/logger");
const semverComp = require("../lib/semver-comp");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function printNodeCheckLog() {
  const nodeVersion = process.version.slice(1);
  const nodeVerRet = semverComp(nodeVersion, "6.0.0");
  logger.log(chalk.cyan(`Your Node version is: ${nodeVersion}`));

  if (nodeVerRet >= 0) {
    logger.log(
      chalk.yellow(
        `You are using Node version ${nodeVersion}. Electrode should work for you.\n`
      )
    );
  } else {
    logger.log(
      chalk.yellow(
        `Your Node version is: ${nodeVersion}. We recommend use Node LTS version 6.\n`
      )
    );
  }
}

function printnpmCheckLog(npmVersion) {
  npmVersion = npmVersion.stdout.slice(0, -1);
  const npmVerRet = semverComp(npmVersion, "3.0.0");
  logger.log(chalk.cyan(`Your npm version is: ${npmVersion}`));

  if (npmVerRet >= 0) {
    logger.log(
      chalk.yellow(
        `You are using npm version ${npmVersion}. Electrode should work for you.\n`
      )
    );
  } else {
    logger.log(
      chalk.yellow(
        `Your npm version is: ${npmVersion}. Electrode requires npm version 3 and up.\n`
      )
    );
  }
}

function printNodePath() {
  const nodePath = process.execPath;
  logger.log(chalk.cyan(`Your Node binary path is: ${nodePath}\n`));
}

function checkNode(type, igniteCore, spinner) {
  spinner.start();

  return xsh
    .exec(true, "npm -v")
    .then(npmVersion => {
      printNodeCheckLog();
      printnpmCheckLog(npmVersion);
      printNodePath();

      spinner.stop();

      if (type && igniteCore) {
        logger.log(chalk.green("Please choose your next task:"));
        igniteCore(type);
      }

      if (!igniteCore) {
        rl.close();
      }
      return true;
    })
    .catch(err => {
      errorHandler(err, "Checking node env.")
    });
}

module.exports = checkNode;
