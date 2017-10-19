"use strict";

const { MenuItem, logger } = require("ignite-core");
const Promise = require("bluebird");
const opn = require("opn");
const chalk = require("chalk");

module.exports = function(link, docType) {
  function execute() {
    link = link || "https://docs.electrode.io";
    docType = docType || "Open Source";
    return Promise.try(() => opn(link, { wait: false })).then(() => {
      logger.log(
        chalk.green(
          `Electrode ${docType} docs opened in your browser, please check.`
        )
      );
    });
  }

  return new MenuItem({
    cliCmd: "docs",
    icon: "\u263A",
    menuText: "Electrode official documenations",
    execute
  });
};
