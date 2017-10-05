"use strict";

const { MenuItem, logger } = require("ignite-core");
const Promise = require("bluebird");
const opn = require("opn");
const chalk = require("chalk");

module.exports = function() {
  function execute() {
    return Promise.try(() => opn("https://docs.electrode.io", { wait: false })).then(() => {
      logger.log(chalk.green("Electrode docs opened in your browser, please check."));
    });
  }

  return new MenuItem({
    cliCmd: "docs",
    icon: "\u263A",
    menuText: "Electrode official documenations",
    execute
  });
};
