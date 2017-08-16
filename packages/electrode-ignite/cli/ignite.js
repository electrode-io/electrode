"use strict";

const chalk = require("chalk");
const xsh = require("xsh");

const igniteCore = require("ignite-core");
const pkg = require("../package.json");
const logger = require("../lib/logger");
const errorHandler = require("../lib/error-handler");
let startTime;

function checkElectrodeIgnite() {
  xsh
    .exec(true, "npm show electrode-ignite version")
    .then(function(latestVersion) {
      var latestVersion = latestVersion.stdout.slice(0, -1);

      if (latestVersion > pkg.version) {
        /* Case 1: electrode-ignite version outdated */
        logger.log(
          chalk.yellow(`Latest version is ${latestVersion} - trying to update.`)
        );
        xsh
          .exec(true, `npm install -g electrode-ignite@${latestVersion}`)
          .then(function() {
            /* Auto update electrode-ignite version */
            logger.log(
              chalk.yellow(
                `electrode-ignite updated to ${latestVersion}, exiting, please run your command again.`
              )
            );
            return process.exit(0);
          })
          .catch(err =>
            errorHandler(
              err,
              "Since it may not be safe for a module to update itself while running, " +
                "please run the update command manually after electrode-ignite exits." +
                `\nThe command is: npm install -g electrode-ignite@${latestVersion}`
            )
          );
      } else if (latestVersion === pkg.version) {
        /* Case 2: electrode-ignite latest version */
        logger.log(
          chalk.green("You've aleady installed the latest electrode-ignite.\n")
        );

        /* ignite-core */
        igniteCore("oss", process.argv[2]);
      } else {
        /* Case 3: Invalid electrode-ignite version */
        errorHandler(
          "Failed at: Invalid electrode-ignite version. Please verify your package.json."
        );
      }
    })
    .catch(err =>
      errorHandler(
        err,
        "Please make sure you've installed electrode-ignite globally."
      )
    );
}

function ignite() {
  logger.log(chalk.green(`Welcome to electrode-ignite version ${pkg.version}`));
  logger.log(chalk.green("Checking latest version available on npm..."));

  if (!startTime || new Date().getTime() - startTime > 24 * 3600) {
    startTime = undefined;
    checkElectrodeIgnite();
  } else {
    /* ignite-core */
    igniteCore("oss", process.argv[2]);
  }
}

module.exports = ignite;
