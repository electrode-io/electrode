"use strict";

const Yargs = require("yargs");
const chalk = require("chalk");

const taskLoader = require("./lib/task-loader");
const errorHandler = require("./lib/error-handler");
const usage = require("./lib/usage");
const igniteMenu = require("./lib/menu");

Yargs.command(
  chalk.cyan("install"),
  chalk.cyan("Install tools for Electrode development")
)
  .command(
    chalk.cyan("check-nodejs"),
    chalk.cyan("Check your NodeJS and npm environment")
  )
  .command(
    chalk.cyan("generate-app"),
    chalk.cyan("Generate an Electrode application")
  )
  .command(
    chalk.cyan("generate-component"),
    chalk.cyan("Generate an Electrode component")
  )
  .command(
    chalk.cyan("add-component"),
    chalk.cyan("Add a component to your existing component repo")
  )
  .command(
    chalk.cyan("check-ignite"),
    chalk.cyan("Check for electrode-ignite update")
  )
  .command(chalk.cyan("docs"), chalk.cyan("Electrode official documenations"))
  .help().argv;

const igniteCore = function(type, task) {
  switch (task) {
    case undefined:
      igniteMenu(type, igniteCore);
      break;
    case "install":
      taskLoader("1", type);
      break;
    case "check-nodejs":
      taskLoader("2", type);
      break;
    case "generate-app":
      taskLoader("3", type);
      break;
    case "generate-component":
      taskLoader("4", type);
      break;
    case "add-component":
      taskLoader("5", type);
      break;
    case "docs":
      taskLoader("6", type);
      break;
    case "check-ignite":
      taskLoader("7", type);
      break;
    default:
      errorHandler(
        `The task name "${Yargs.argv._}" you've provided appears to be invalid.\n` +
          `Please use "ignite --help" to check all the available tasks.`
      );
  }
  return true;
};

module.exports = igniteCore;
