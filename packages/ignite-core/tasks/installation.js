"use strict";

const chalk = require("chalk");
const readline = require("readline");
const xsh = require("xsh");

const backToMenu = require("../lib/back-to-menu");
const errorHandler = require("../lib/error-handler");
const igniteCore = require("../ignite");
const logger = require("../lib/logger");
const semverComp = require("../lib/semver-comp");

const installXClapCLI = (type, igniteCore, spinner, showHint) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  return rl.question("Proceed? (y/n) ", answer => {
    if (answer.toLowerCase() === "y") {
      spinner.start();
      return xsh
        .exec("npm install -g xclap-cli")
        .then(ver => {
          const verStdout = ver.stdout;
          const verStart =
            verStdout.indexOf("xclap-cli@") + "xclap-cli@".length;
          const verEnd = verStdout.indexOf("\n", verStart);
          const latestVersion = verStdout.substring(verStart, verEnd).trim();

          spinner.stop();

          logger.log(
            chalk.cyan(`You've successfully installed the latest xclap-cli@${latestVersion}.`)
          );
          return backToMenu(type, igniteCore, showHint);
        })
        .catch(err => errorHandler(err, `Install xclap-cli globally.`));
    } else if(answer.toLowerCase() === "n") {
      logger.log(chalk.cyan("You've cancelled the xclap-cli installation."));
      return backToMenu(type, igniteCore, showHint);
    } else {
      logger.log(chalk.cyan("Please provide 'y' or 'n'."));
      rl.close();
      return installXClapCLI(type, igniteCore, spinner, showHint);
    }
  });
};

const checkLocalXClapCLI = function() {
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
    });
};

const Installation = function(type, igniteCore, spinner, igniteName, showHint) {
  spinner.start();
  return checkLocalXClapCLI().then(function(version) {
    if (!version) {
      /* Case 1: xclap-cli does not installed globally */
      spinner.stop();
      console.log(
        chalk.cyan(
          `${igniteName} is about to install the following modules globally:\n- xclap-cli\n`
        )
      );
      return installXClapCLI(type, igniteCore, spinner, showHint);
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
          return backToMenu(type, igniteCore, showHint);
        } else if (verRet < 0) {
          /* Case 3: xclap-cli version is out-dated */
          spinner.stop();
          console.log(
            chalk.cyan(
              `${igniteName} is about to update the following modules globally:\n- xclap-cli (from version ${version} to version ${latestversion})`
            )
          );
          return installXClapCLI(type, igniteCore, spinner, showHint);
        } else {
          spinner.stop();
          errorHandler("Error when fetching Electrode packages");
        }
      });
    }
  });
};

module.exports = Installation;
