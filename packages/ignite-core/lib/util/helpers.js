"use strict";

const Spinner = require("cli-spinner").Spinner;
const readline = require("readline");
const Promise = require("bluebird");
const xsh = require("xsh");
const logger = require("../util/logger");
const chalk = require("chalk");
const checkModule = require("../util/check-module");
const _ = require("lodash");

const SPINNER_STRING = 3;

const Lib = {};

module.exports = Object.assign(Lib, {
  makeSpinner: function makeSpinner(title) {
    const spinner = new Spinner(`${title} .. %s`);
    spinner.setSpinnerString(SPINNER_STRING);
    return spinner;
  },

  yesNoPrompt: function yesNoPrompt(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const ask = resolve => {
      rl.question(`${question} (Y/N): `, answer => {
        answer = (answer || "").toUpperCase();
        if (answer === "Y") resolve(true);
        else if (answer === "N") resolve(false);
        else ask(resolve);
      });
    };

    return new Promise(ask).finally(() => {
      rl.close();
    });
  },

  pausePrompt: function() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise(resolve => {
      rl.question("Press enter to continue ...", () => {
        rl.close();
        resolve();
      });
    });
  },

  /* eslint-disable max-params */
  npmInstall: function npmInstall(name, version, isGlobal, npmReg) {
    const globally = isGlobal ? " globally" : "";
    const flags = isGlobal ? "-g" : "";
    const npmRegFlag = checkModule.npmRegistryFlag(npmReg);

    const colorize = (m, v) => `${chalk.green(m)}@${chalk.magenta(v)}`;

    const spinner = Lib.makeSpinner(`Installing ${colorize(name, version)}${globally}`);
    spinner.start();
    return xsh
      .exec(true, `npm ${npmRegFlag} install ${flags} ${name}@${version}`)
      .catch(err => {
        Lib.showNpmErr(err);
        throw err;
      })
      .then(() => {
        return checkModule
          .latest(name, npmReg)
          .then(v => {
            spinner.stop();
            logger.log(
              chalk.cyan(
                `You've successfully installed the latest ${colorize(name, v)}${globally}`
              ),
              "\n"
            );
          })
          .catch(err => {
            logger.log(
              `Unable to check result of npm install of ${colorize(name, version)}${globally}`,
              "\n"
            );
            logger.log(`Error was: ${err.stack}`);
          });
      })
      .finally(() => spinner.stop());
  },

  /* eslint-disable no-console */
  showNpmErr: function showNpmErr(err) {
    logger.log(chalk.red(`npm install failed, output from ${chalk.cyan("stdout")}:`), "\n");
    console.log(_.get(err, "output.stdout", ""));
    logger.log(chalk.red(`npm install failed, output from ${chalk.cyan("stderr")}:`));
    const stderr = _.get(err, "output.stderr", "").replace(/ERR!/g, chalk.red("ERR!"));
    console.log(stderr);
  },

  showManualInstallMsg: function(err, data) {
    const globally = data.isGlobal ? " globally" : "";
    const flags = data.isGlobal ? "-g" : "";
    const dispName = chalk.green(data.name);
    const dispVer = chalk.magenta(data.version);

    logger.log(`Unable to install ${dispName}@${dispVer}${globally}.  See above for npm output.`);
    logger.log(`Error: ${chalk.red(err.message)}`);
    (data.msgs || []).forEach(m => logger.log(m));
    logger.log("Please install it manually.  The command is:");
    logger.log(chalk.magenta(`npm install ${flags} ${data.name}@${data.version}`));
  }
});
