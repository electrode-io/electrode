"use strict";

const { MenuItem, logger } = require("ignite-core");
const Promise = require("bluebird");
const opn = require("opn");
const chalk = require("chalk");

module.exports = function(link) {
  function execute() {
    const defaultLink = "https://docs.electrode.io";
    link = link || defaultLink;
    return Promise.try(() => opn(link, { wait: false })).then(() => {
      const docType = link === defaultLink ? "Open Source" : "Internal";
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
