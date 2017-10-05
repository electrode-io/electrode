"use strict";

const MenuItem = require("../menu-item");
const helpers = require("../util/helpers");
const Promise = require("bluebird");
const checkModule = require("../util/check-module");
const chalk = require("chalk");
const logger = require("../util/logger");

module.exports = function() {
  let checked = false;
  const mod = "xclap-cli";
  const checkSpinner = helpers.makeSpinner("Checking your installed tools");
  const dispName = chalk.green(mod);

  function execute() {
    checkSpinner.start();
    return Promise.all([checkModule.globalInstalled(mod), checkModule.latest(mod)])
      .then(ver => {
        checkSpinner.stop();
        const dispV = chalk.magenta(ver[1]);
        if (checkModule.isNewVersion(ver[0], ver[1])) {
          return helpers.yesNoPrompt(`Update ${dispName} to version ${dispV}`).then(yes => {
            if (!yes) return undefined;
            return helpers.npmInstall(mod, ver[1], true).catch(err => {
              helpers.showManualInstallMsg(err, {
                name: mod,
                version: ver[1],
                isGlobal: true
              });
            });
          });
        } else {
          return logger.log(
            chalk.cyan(
              `Congratulations, you've already installed the latest ${dispName}@${dispV} globally.`
            ),
            "\n"
          );
        }
      })
      .finally(() => checkSpinner.stop());
  }

  const mi = new MenuItem({
    cliCmd: "install",
    icon: "\u2668",
    menuText: "Install tools for Electrode development",
    execute
  });

  mi.on("pre_show", options => {
    if (checked) return 0;
    checked = true;
    return Promise.all([checkModule.globalInstalled(mod), checkModule.latest(mod)]).then(v => {
      if (v[0] === "0.0.0") {
        logger.log(
          `You don't have ${dispName} installed.  Pick option ${mi.index} to install it.`,
          "\n"
        );
        options.menu.emit("refresh_prompt");
      } else if (checkModule.isNewVersion(v[0], v[1])) {
        const newV = chalk.magenta(v[1]);
        logger.log(
          `New version ${newV} of ${dispName} available.  Pick option ${mi.index} to update it.`
        );
        options.menu.emit("refresh_prompt");
      }
    });
  });

  return mi;
};
