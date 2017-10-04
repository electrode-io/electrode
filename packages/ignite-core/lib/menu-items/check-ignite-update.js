"use strict";

const MenuItem = require("../menu-item");

const Promise = require("bluebird");
const checkModule = require("../util/check-module");
const helpers = require("../util/helpers");
const chalk = require("chalk");
const logger = require("../util/logger");

module.exports = function(name) {
  let versions;
  let executed = false;
  name = name || "electrode-ignite";

  const dispName = chalk.green(name);
  const spinner = helpers.makeSpinner(`checking latest version of ${dispName}`);

  function execute() {
    executed = true;
    spinner.start();
    return Promise.all([checkModule.globalInstalled(name), checkModule.latest(name)])
      .then(v => {
        versions = v;
        spinner.stop();
        const iversion = chalk.magenta(versions[0]);
        const version = chalk.magenta(versions[1]);
        if (checkModule.isNewVersion(versions[0], versions[1])) {
          const msg = `Update ${dispName} from version ${iversion} to ${version}`;
          return helpers.yesNoPrompt(msg).then(yes => {
            return yes && helpers.installNpm(name, versions[1], true);
          });
        } else {
          logger.log(`Your version ${version} of ${dispName} is already the latest.`, "\n");
        }
        return undefined;
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
        checkModule.latestOnceDaily(name)
      ]).then(v => {
        versions = v;
        if (!executed && checkModule.isNewVersion(versions[0], versions[1])) {
          logger.log(
            `Newer version ${chalk.magenta(v[1])} of ${dispName} found.  ` +
              `Pick option ${mi.index} to update.`,
            "\n"
          );
          options.menu.emit("prompt");
        }
      });
    }, 1);
  });

  return mi;
};
