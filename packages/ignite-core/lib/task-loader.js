"use strict";

const chalk = require("chalk");

const checkIgnite = require("../tasks/check-ignite");
const checkNode = require("../tasks/check-node");
const docs = require("../tasks/docs");
const generator = require("../tasks/generator");
const installationTaskExec = require("../tasks/installation");
const logger = require("./logger");

const CLISpinner = require("cli-spinner").Spinner;
const spinner = new CLISpinner(chalk.green("%s"));
spinner.setSpinnerString("|/-\\");

function taskLoader(option, type, igniteCore, showHint) { // eslint-disable-line
  const igniteName = type === "oss" ? "electrode-ignite" : "@walmart/electrode-ignite";

  switch (option) {
    case "1":
      logger.log(chalk.green("Checking your Electrode environment..."));
      installationTaskExec(type, igniteCore, spinner, igniteName, showHint);
      break;
    case "2":
      logger.log(chalk.green("Checking your NodeJS and npm environment..."));
      checkNode(type, igniteCore, spinner, showHint);
      break;
    case "3":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, "electrode", igniteCore, spinner)
        : generator(type, "@walmart/electrode", igniteCore, spinner);
      break;
    case "4":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, "electrode:component", igniteCore, spinner)
        : generator(type, "@walmart/electrode:component", igniteCore, spinner);
      break;
    case "5":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, "electrode:component-add", igniteCore, spinner)
        : generator(
            type,
            "@walmart/electrode:component-add",
            igniteCore,
            spinner
          );
      break;
    case "6":
      docs(type, igniteCore, showHint);
      break;
    case "7":
      spinner.stop();
      logger.log(chalk.green(`Checking for ${igniteName} update...`));
      checkIgnite(type, igniteCore, igniteName, showHint, true);
      break;
    case "8":
      logger.log(chalk.green("You've successfully exit Electrode Ignite."));
      return process.exit(0); // eslint-disable-line no-process-exit
  }
}

module.exports = taskLoader;
