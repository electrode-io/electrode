"use strict";

const MenuItem = require("../menu-item");

const Promise = require("bluebird");
const checkModule = require("../util/check-module");
const helpers = require("../util/helpers");
const chalk = require("chalk");
const logger = require("../util/logger");

/* eslint-disable no-invalid-this */

module.exports = function(name, npmReg) {
  let versions;
  let executed = false;
  name = name || "electrode-ignite";

  const dispName = chalk.green(name);
  const spinner = helpers.makeSpinner(`checking latest version of ${dispName}`);

  function execute(options) {
    executed = true;
    spinner.start();
    return Promise.all([checkModule.globalInstalled(name), checkModule.latest(name, npmReg)])
      .then(ver => {
        versions = ver;
        spinner.stop();
        const iversion = chalk.magenta(ver[0]);
        const version = chalk.magenta(ver[1]);
        if (!checkModule.isNewVersion(ver[0], ver[1])) {
          return logger.log(`Your version ${version} of ${dispName} is already the latest.`, "\n");
        }
        const msg = `Update ${dispName} from version ${iversion} to ${version}`;
        return helpers.yesNoPrompt(msg).then(yes => {
          if (!yes) return undefined;
          return helpers
            .npmInstall(name, ver[1], true, npmReg)
            .then(() => {
              logger.log(`Please restart ${dispName} for the new version.`);
            })
            .catch(err => {
              const m =
                "This may be due to your system not allowing it to be updated while it's running.";
              helpers.showManualInstallMsg(err, {
                name,
                version: ver[1],
                isGlobal: true,
                msgs: [chalk.yellow(m)]
              });
            })
            .finally(() => {
              this.noPause = true;
              options.menu.emit("exit");
            });
        });
      })
      .finally(() => spinner.stop());
  }

  const mi = new MenuItem({
    cliCmd: "check-update",
    icon: "\u2603",
    menuText: `Check for ${name} update`,
    execute
  });

  mi.once("post_show", options => {
    setTimeout(() => {
      Promise.all([
        checkModule.globalInstalled(name),
        checkModule.latestOnceDaily(name, null, npmReg)
      ]).then(v => {
        versions = v;
        if (!executed && checkModule.isNewVersion(versions[0], versions[1])) {
          logger.log(
            `Newer version ${chalk.magenta(v[1])} of ${dispName} found.  ` +
              `Pick option ${mi.index} to update.`,
            "\n"
          );
          options.menu.emit("refresh_prompt");
        }
      });
    }, 1);
  });

  return mi;
};
