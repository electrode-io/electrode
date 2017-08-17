"use strict";

const chalk = require("chalk");
const xsh = require("xsh");

const igniteCore = require("ignite-core");
const errorHandler = require("ignite-core/lib/error-handler");
const logger = require("ignite-core/lib/logger");
const semverComp = require("ignite-core/lib/semver-comp");

const pkg = require("../package.json");

let startTime;

const igniteOutdated = function(latestVersion) {
  logger.log(
    chalk.yellow(
      `You are currently in electrode-ignite@${pkg.version}.` +
        ` The latest version is ${latestVersion}.`
    )
  );
  logger.log(chalk.yellow("Please hold, trying to update."));

  /* Auto update electrode-ignite version */
  return xsh
    .exec(true, `npm install -g electrode-ignite@${latestVersion}`)
    .then(function() {
      logger.log(
        chalk.yellow(
          `electrode-ignite updated to ${latestVersion},` +
            ` exiting, please run your command again.`
        )
      );
      return process.exit(0);
    })
    .catch(err =>
      errorHandler(
        err,
        `Since it may not be safe for a module to update itself while running,` +
          ` please run the update command manually after electrode-ignite exits.` +
          ` The command is: npm install -g electrode-ignite@${latestVersion}`
      )
    );
};

const igniteUpToDate = function(task) {
  logger.log(
    chalk.green("You've aleady installed the latest electrode-ignite.")
  );

  /* Start ignite-core */
  return igniteCore("oss", task);
};

function checkElectrodeIgnite() {
  return xsh
    .exec(true, "npm show electrode-ignite version")
    .then(function(latestVersion) {
      latestVersion = latestVersion.stdout.slice(0, -1);

      /* Case 1: electrode-ignite version outdated */
      if (semverComp(latestVersion, pkg.version) > 0) {
        igniteOutdated(latestVersion);

        /* Case 2: electrode-ignite latest version */
      } else if (semverComp(latestVersion, pkg.version) === 0) {
        igniteUpToDate(process.argv[2]);

        /* Case 3: Invalid electrode-ignite version */
      } else {
        errorHandler(
          "Invalid electrode-ignite version. Please report this to Electrode core team."
        );
      }
    })
    .catch(err =>
      errorHandler(
        err,
        `Invalid electrode-ignite in the npm registry.` +
          ` Please report this to Electrode core team.`
      )
    );
}

function ignite() {
  logger.log(chalk.green(`Welcome to electrode-ignite version ${pkg.version}`));
  logger.log(chalk.green("Checking latest version available on npm ..."));

  if (!startTime || new Date().getTime() - startTime > 24 * 3600) {
    startTime = undefined;
    return checkElectrodeIgnite();
  } else {
    /* ignite-core */
    return igniteCore("oss", process.argv[2]);
  }
}

module.exports = ignite;
