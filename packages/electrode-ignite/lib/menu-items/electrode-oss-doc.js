"use strict";

const { MenuItem, logger } = require("ignite-core");
const Promise = require("bluebird");
const opn = require("opn");
const chalk = require("chalk");

module.exports = function(link, docType, cliCmd) {
  link = link || "https://docs.electrode.io";
  docType = docType || "Open Source";
  cliCmd = cliCmd || "docs";

  function execute() {
    return Promise.try(() => opn(link, { wait: false })).then(() => {
      logger.log(
        chalk.green(
          `Electrode ${docType} docs opened in your browser, please check.`
        )
      );
    });
  }

  return new MenuItem({
    cliCmd,
    icon: "\u263A",
    menuText: `Electrode ${docType} official documenation`,
    execute
  });
};
