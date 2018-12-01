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
    const myVersion = require(`${name}/package.json`).version; // eslint-disable-line
    return Promise.resolve(checkModule.latest(name, npmReg))
      .then(latest => {
        spinner.stop();
        const dispMy = chalk.magenta(myVersion);
        const dispLatest = chalk.magenta(latest);
        if (!checkModule.isNewVersion(myVersion, latest)) {
          return logger.log(`Your version ${dispMy} of ${dispName} is already the latest.\n`);
        }
        const msg = `Update ${dispName} from version ${dispMy} to ${dispLatest}`;
        return helpers.yesNoPrompt(msg).then(yes => {
          if (!yes) return undefined;
          return helpers
            .npmInstall(name, latest, true, npmReg)
            .then(() => {
              logger.log(`Please restart ${dispName} for the new version.`);
            })
            .catch(err => {
              const m =
                "This may be due to your system not allowing it to be updated while it's running.";
              helpers.showManualInstallMsg(err, {
                name,
                version: latest[1],
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
        require(`${name}/package.json`).version, // eslint-disable-line
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
        } else {
          options.menu.emit("no_op");
        }
      });
    }, 1);
  });

  return mi;
};
