"use strict";

const readline = require("readline");
const xsh = require("xsh");
const logger = require("../lib/logger");
const chalk = require("chalk");
const errorHandler = require("../lib/error-handler");
const semverComp = require("../lib/semver-comp");
const igniteCore = require("../ignite");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function backToMenu(type, igniteCore) {
  if (type && igniteCore) {
    logger.log(chalk.green("Please choose your next task:"));
    return igniteCore(type);
  }
  return process.exit(0);
}

const installXClapCLI = function(type, igniteCore, spinner) {
  return rl.question("Proceed? (y/n) ", answer => {
    if (answer.toLowerCase() === "y") {
      spinner.start();
      return xsh
        .exec("npm install -g xclap-cli")
        .then(function() {
          spinner.stop();
          logger.log(
            chalk.cyan(`You've successfully installed the latest xclap-cli.`)
          );
          backToMenu(type, igniteCore);
        })
        .catch(err =>
          errorHandler(err, ``)
        );
    } else {
      logger.log(chalk.cyan("You've cancelled the xclap-cli installation."));
      backToMenu(type, igniteCore);
    }
  });
};

const checkXClapCLI = function() {
  return xsh
    .exec(true, "npm ls -g -j --depth=0 xclap-cli")
    .then(function(ret) {
      return JSON.parse(ret.stdout).dependencies["xclap-cli"].version;
    })
    .catch(function() {
      return null;
    });
};

const checkXClapCLILatestVersion = function() {
  return xsh
    .exec(true, "npm show xclap-cli version")
    .then(function(version) {
      return version.stdout.slice(0, -1);
    })
    .catch(function() {
      return null;
    })
};

const Installation = function(type, igniteCore, spinner) {
  const igniteName = type === "oss" ? "Electrode Ignite" : "WML Electrode Ignite";

  spinner.start();
  return checkXClapCLI().then(function(version) {
    if (!version) {
      /* Case 1: xclap-cli does not installed globally */
      spinner.stop();
      console.log(
        chalk.cyan(
          `${igniteName} is about to install the following modules globally:\n- xclap-cli\n`
        )
      );
      return installXClapCLI(type, igniteCore, spinner);
    } else {
      return checkXClapCLILatestVersion().then(function(latestversion) {
        /* Case 2: xclap-cli already got the latest version */
        const verRet = semverComp(version, latestversion);
        if (verRet === 0) {
          spinner.stop();
          logger.log(
            chalk.cyan(
              `Congratulations, you've already installed the latest xclap-cli@${latestversion} globally.`
            )
          );
          backToMenu(type, igniteCore);
        } else if (verRet < 0) {
          /* Case 3: xclap-cli version is out-dated */
          spinner.stop();
          console.log(
            chalk.cyan(
              `${igniteName} is about to update the following modules globally:\n- xclap-cli (from version ${version} to version ${latestversion})`
            )
          );
          return installXClapCLI(type, igniteCore, spinner);
        } else {
          spinner.stop();
          errorHandler("Error when fetching Electrode packages");
        }
      });
    }
  });
};

module.exports = Installation;
