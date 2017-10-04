"use strict";

const Spinner = require("cli-spinner").Spinner;
const readline = require("readline");
const Promise = require("bluebird");
const xsh = require("xsh");
const logger = require("../util/logger");
const chalk = require("chalk");
const checkModule = require("../util/check-module");

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

  installNpm: function installNpm(name, version, isGlobal) {
    const globally = isGlobal ? " globally" : "";
    const flags = isGlobal ? "-g" : "";

    const colorize = (m, v) => `${chalk.green(m)}@${chalk.magenta(v)}`;

    const spinner = Lib.makeSpinner(`Installing ${colorize(name, version)}${globally}`);
    spinner.start();
    return xsh
      .exec(true, `npm install ${flags} ${name}@${version}`)
      .then(() => {
        return checkModule.latest(name).then(v => {
          spinner.stop();
          logger.log(
            chalk.cyan(`You've successfully installed the latest ${colorize(name, v)}${globally}`),
            "\n"
          );
        });
      })
      .finally(() => spinner.stop());
  }
});
