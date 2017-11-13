"use strict";

const MenuItem = require("../menu-item");
const checkEnv = require("../util/check-env");
const logger = require("../util/logger");
const chalk = require("chalk");

module.exports = function() {
  let npmVersion;

  const mi = new MenuItem({
    cliCmd: "check-nodejs",
    icon: "\u2611",
    menuText: "Check your NodeJS and npm environment",
    spinnerTitle: "checking node and npm versions",
    execute: () => checkEnv.getNpmVersion().then(version => (npmVersion = version))
  });

  mi.on("post_execute", () => {
    checkEnv.node(process.versions.node);
    checkEnv.npm(npmVersion);
    logger.log(chalk.cyan(`Your Node binary path is: ${process.execPath}`));
  });

  return mi;
};
