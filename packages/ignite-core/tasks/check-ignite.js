"use strict";

const xsh = require("xsh");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const logger = require("../lib/logger");
const semverComp = require("../lib/semver-comp");
const errorHandler = require("../lib/error-handler");

const CLISpinner = require("cli-spinner").Spinner;
const spinner = new CLISpinner(chalk.green("%s"));
spinner.setSpinnerString("|/-\\");

const CHECK_INTERVAL = 1000 * 24 * 3600;
let igniteName = "";

const igniteUpToDate = function(type, task, version, igniteCore) {
  logger.log(
    chalk.cyan(
      `Congratulations! You've aleady installed the latest ${igniteName}@${version}.`
    )
  );

  /* Start ignite-core */
  return igniteCore(type, task);
};

const igniteOutdated = function(latestVersion) {
  logger.log(
    chalk.cyan(
      `You are currently in ${igniteName}@${version}.` +
        ` The latest version is ${latestVersion}.`
    )
  );
  logger.log(chalk.cyan("Please hold, trying to update."));

  /* Auto update electrode-ignite version */
  spinner.start();
  return xsh
    .exec(true, `npm install -g ${igniteName}@${latestVersion}`)
    .then(function() {
      logger.log(
        chalk.cyan(
          `${igniteName} updated to ${latestVersion},` +
            ` exiting, please run your command again.`
        )
      );
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
};

const checkInstalledIgnite = function() {
  return xsh
    .exec(true, `npm ls -g -j --depth=0 ${igniteName}`)
    .then(function(ret) {
      return JSON.parse(ret.stdout).dependencies[igniteName].version;
    })
    .catch(function(err) {
      errorHandler(err, `Error when fetching local installed ${igniteName}.`);
    });
};

/*
  check electrode-ignite once daily
  timestamp saved in directory /tmp/ignite-timestamp.txt
*/
const igniteDailyCheck = function() {
  return new Promise((resolve, reject) => {
    const timeStampPath = "/tmp/ignite-timestamp.txt";
    if (!fs.existsSync(timeStampPath)) {
      fs.writeFile(
        timeStampPath,
        new Date().getTime(),
        { flag: "wx" },
        function(err) {
          if (err) {
            errorHandler(
              err,
              `Saving timestamp to directory ${timeStampPath}.`
            );
          }
        }
      );
      resolve(true);
    } else {
      fs.readFile(timeStampPath, function(err, data) {
        if (err) {
          errorHandler(
            err,
            `Reading timestamp from directory ${timeStampPath}.`
          );
        }

        if (new Date().getTime() - data.toString() > CHECK_INTERVAL) {
          fs.truncate(timeStampPath, 0, function() {
            fs.writeFile(
              timeStampPath,
              new Date().getTime(),
              { flag: "w" },
              function(err) {
                if (err) {
                  errorHandler(
                    err,
                    `Saving new timestamp to directory ${timeStampPath}.`
                  );
                }
              }
            );
          });

          resolve(true);
        } else {
          resolve(false);
        }
      });
    }
  });
};

const checkIgnite = function(type, igniteCore) {
  igniteName = type === "oss" ? "electrode-ignite" : "wml-electrode-ignite";

  return igniteDailyCheck().then(function(passed) {
    if (passed) {
      logger.log(chalk.green("Checking latest version available on npm ..."));
      spinner.start();
      return checkInstalledIgnite().then(function(version) {
        return xsh
          .exec(true, `npm show ${igniteName} version`)
          .then(function(latestVersion) {
            latestVersion = latestVersion.stdout.slice(0, -1);
            const versionComp = semverComp(latestVersion, version);

            /* Case 1: electrode-ignite version outdated */
            if (versionComp > 0) {
              igniteOutdated(latestVersion);
              spinner.stop();
              return;

              /* Case 2: electrode-ignite latest version */
            } else if (versionComp === 0) {
              igniteUpToDate(type, process.argv[2], latestVersion, igniteCore);
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
      if (type && igniteCore) {
        return igniteCore(type, process.argv[2]);
      }
      return process.exit(0);
    }
  });
};

module.exports = checkIgnite;
