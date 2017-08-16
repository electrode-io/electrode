"use strict";

const readline = require("readline");
const taskLoader = require("./lib/task-loader");
const errorHandler = require("./lib/error-handler");
const logger = require("./lib/logger");
const chalk = require("chalk");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function igniteCore(type, task) {
  if (!task) {
    let option;
    console.log(
      "---------------------------------------------------------\n" +
        " * * * * * * * Electrode Ignite Menu * * * * * * * * * * \n" +
        "---------------------------------------------------------\n" +
        "[1] Install tools for Electrode development (install)\n" +
        "[2] Check your NodeJS and npm environment (check-nodejs)\n" +
        "[3] Generate an Electrode application (generate-app)\n" +
        "[4] Generate an Electrode component (generate-component)\n" +
        "[5] Add a component to your existing component repo (add-component)\n" +
        "[6] Electrode official documenations (docs)\n" +
        "---------------------------------------------------------\n"
    );
    rl.question("Please select your option: ", answer => {
      option = answer;

      // Invalid Electrode Option will re-trigger the menu
      while (option < 1 || option > 6) {
        logger.log(chalk.red("Please provide a valid option between 1 to 5."));
        igniteCore(type);
        break;
      }

      taskLoader(option, type);
    });
  } else if (task === "install") {
    taskLoader("1");
  } else if (task === "check-nodejs") {
    taskLoader("2");
  } else if (task === "generate-app") {
    taskLoader("3", type);
  } else if (task === "generate-component") {
    taskLoader("4", type);
  } else if (task === "add-component") {
    taskLoader("5", type);
  } else if (task === "docs") {
    taskLoader("6", type);
  } else {
    errorHandler("Please provide a valid task name.");
  }
}

module.exports = igniteCore;
