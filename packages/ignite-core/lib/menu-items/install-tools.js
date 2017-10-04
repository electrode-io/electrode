"use strict";

const MenuItem = require("../menu-item");
const helpers = require("../util/helpers");
const Promise = require("bluebird");
const checkModule = require("../util/check-module");
const chalk = require("chalk");
const logger = require("../util/logger");

module.exports = function() {
  const checkSpinner = helpers.makeSpinner("Checking your installed tools");

  function execute() {
    checkSpinner.start();
    const mod = "xclap-cli";
    return Promise.all([checkModule.globalInstalled(mod), checkModule.latest(mod)])
      .then(v => {
        checkSpinner.stop();
        const name = chalk.green(mod);
        const newV = chalk.magenta(v[1]);
        if (checkModule.isNewVersion(v[0], v[1])) {
          return helpers.yesNoPrompt(`Update ${name} to version ${newV}`).then(yes => {
            return yes && helpers.installNpm(mod, v[1], true);
          });
        } else {
          return logger.log(
            chalk.cyan(
              `Congratulations, you've already installed the latest ${name}@${newV} globally.`
            ),
            "\n"
          );
        }
      })
      .finally(() => checkSpinner.stop());
  }

  return new MenuItem({
    cliCmd: "install",
    icon: "\u2668",
    menuText: "Install tools for Electrode development",
    execute
  });
};
