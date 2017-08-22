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
  .command(chalk.cyan("docs"), chalk.cyan("Electrode official documenations"))
  .help().argv;

const igniteCore = function(type, task) {
  if (!task) {
    return igniteMenu(type, igniteCore);
  } else if (task === "install") {
    return taskLoader("1", type, igniteCore);
  } else if (task === "check-nodejs") {
    return taskLoader("2", type, igniteCore);
  } else if (task === "generate-app") {
    return taskLoader("3", type);
  } else if (task === "generate-component") {
    return taskLoader("4", type);
  } else if (task === "add-component") {
    return taskLoader("5", type);
  } else if (task === "docs") {
    return taskLoader("6", type, igniteCore);
  } else {
    errorHandler(
      `The task name "${Yargs.argv._}" you've provided appears to be invalid.\n` +
        `Please use "ignite --help" to check all the available tasks.`
    );
  }
};

module.exports = igniteCore;
