"use strict";

const chalk = require("chalk");
const checkNode = require("../tasks/check-node");
const docs = require("../tasks/docs");
const generator = require("../tasks/generator");
const installationTaskExec = require("../tasks/installation");
const logger = require("./logger");

function taskLoader(option, type, igniteCore) {
  switch (option) {
    case "1":
      logger.log(chalk.green("Checking your Electrode environment..."));
      installationTaskExec(type, igniteCore);
      break;
    case "2":
      logger.log(chalk.green("Checking your NodeJS and npm environment..."));
      checkNode(type, igniteCore);
      break;
    case "3":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, "electrode")
        : generator(type, "@walmart/electrode");
      break;
    case "4":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, "electrode:component")
        : generator(type, "@walmart/electrode:component");
      break;
    case "5":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, "electrode:component-add")
        : generator(type, "@walmart/electrode:component-add");
      break;
    case "6":
      docs(type, igniteCore);
      break;
    case "7":
      logger.log(chalk.green("You've successfully exit Electrode Ignite."));
      return process.exit(0); // eslint-disable-line no-process-exit
  }
  return true;
}

module.exports = taskLoader;
