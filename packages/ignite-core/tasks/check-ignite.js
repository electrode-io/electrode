"use strict";

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const xsh = require("xsh");

const backToMenu = require("../lib/back-to-menu");
const checkTimestamp = require("../lib/check-timestamp").checkTimestamp;
const setTimeStamp = require("../lib/check-timestamp").setTimeStamp;
const errorHandler = require("../lib/error-handler");
const logger = require("../lib/logger");
const semverComp = require("../lib/semver-comp");

const CLISpinner = require("cli-spinner").Spinner;
const spinner = new CLISpinner(chalk.green("%s"));
spinner.setSpinnerString("|/-\\");

const igniteUpToDate = (type, task, version, igniteCore, igniteName) => {
  logger.log(
    chalk.cyan(
      `Congratulations! You've aleady installed the latest ${igniteName}@${version}.`
    )
  );
  setTimeStamp(new Date().getTime());
  igniteCore(type, task);
  return;
};

const igniteOutdated = (
  type,
  task,
  latestVersion,
  version,
  igniteCore,
  igniteName,
  showHint
) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  setTimeStamp(0);

  logger.log(
    chalk.cyan(
      `${igniteName} is about to update the following modules globally:\n- electrode-ignite (from version ${version} to version ${latestVersion})`
    )
  );

  return rl.question("Proceed? (y/n) ", answer => {
    if (answer.toLowerCase() === "y") {
      logger.log(chalk.cyan("Please hold, trying to update."));
      spinner.start();

      return xsh
        .exec(true, `npm install -g ${igniteName}@${latestVersion}`)
        .then(() => {
          logger.log(chalk.cyan(`${igniteName} updated to ${latestVersion},`));
          logger.log(chalk.cyan("Exiting..., please run your command again."));
          setTimeStamp(new Date().getTime());
          spinner.stop();

          return process.exit(0);
        })
        .catch(err =>
          errorHandler(
            err,
            `Since it may not be safe for a module to update itself while running,` +
              ` please run the update command manually after ${igniteName} exits.` +
              ` The command is: npm install -g ${igniteName}@${latestVersion}`
          )
        );
    } else if (answer.toLowerCase() === "n") {
      logger.log(
        chalk.cyan(
          `You've cancelled the electrode-ignite@${latestVersion} installation.`
        )
      );
      return backToMenu(type, igniteCore, showHint);
    } else {
      logger.log(chalk.cyan("Please provide 'y' or 'n'."));
      rl.close();
      return igniteOutdated(
        type,
        task,
        latestVersion,
        version,
        igniteCore,
        igniteName,
        showHint
      );
    }
  });
};

const checkInstalledIgnite = igniteName => {
  return xsh
    .exec(true, `npm ls -g -j --depth=0 ${igniteName}`)
    .then(ret => {
      return JSON.parse(ret.stdout).dependencies[igniteName].version;
    })
    .catch(err => {
      errorHandler(err, `Error when fetching local installed ${igniteName}.`);
    });
};

/*
  check electrode-ignite once daily
  timestamp saved in file "timestamp-wml|oss.txt
*/
const igniteDailyCheck = () => {
  return Promise.resolve(checkTimestamp());
};

const checkIgnite = (type, igniteCore, igniteName, showHint) => {
  return igniteDailyCheck().then(needsCheck => {
    if (needsCheck) {
      logger.log(chalk.green("Checking latest version available on npm ..."));
      spinner.start();

      return checkInstalledIgnite(igniteName).then(version => {
        return xsh
          .exec(true, `npm show ${igniteName} version`)
          .then(latestVersion => {
            latestVersion = latestVersion.stdout.slice(0, -1);
            const versionComp = semverComp(latestVersion, version);

            /* Case 1: electrode-ignite version outdated */
            if (versionComp > 0) {
              igniteOutdated(
                type,
                process.argv[2],
                latestVersion,
                version,
                igniteCore,
                igniteName,
                showHint
              );
              spinner.stop();
              return;

              /* Case 2: electrode-ignite latest version */
            } else if (versionComp === 0) {
              igniteUpToDate(
                type,
                process.argv[2],
                latestVersion,
                igniteCore,
                igniteName
              );
              spinner.stop();
              return;

              /* Case 3: Invalid electrode-ignite version */
            } else {
              spinner.stop();
              errorHandler(
                `Invalid ${igniteName} version@${version}. Please report this to Electrode core team.`
              );
            }
          })
          .catch(err =>
            errorHandler(
              err,
              `Invalid ${igniteName} in the npm registry.` +
                ` Please report this to Electrode core team.`
            )
          );
      });
    } else {
      logger.log(chalk.cyan(`Your ${igniteName} is up-to-date.`));
      return backToMenu(type, igniteCore);
    }
  });
};

module.exports = checkIgnite;
