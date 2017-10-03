"use strict";

const chalk = require("chalk");
const Yargs = require("yargs");

/* eslint-disable no-unused-expressions */
const yargsHelp = function() {
  Yargs.command(chalk.cyan("install"), chalk.cyan("Install tools for Electrode development"))
    .command(chalk.cyan("check-nodejs"), chalk.cyan("Check your NodeJS and npm environment"))
    .command(chalk.cyan("generate-app"), chalk.cyan("Generate an Electrode application"))
    .command(chalk.cyan("generate-component"), chalk.cyan("Generate an Electrode component"))
    .command(
      chalk.cyan("add-component"),
      chalk.cyan("Add a component to your existing component repo")
    )
    .command(chalk.cyan("check-ignite"), chalk.cyan("Check for electrode-ignite update"))
    .command(chalk.cyan("docs"), chalk.cyan("Electrode official documenations"))
    .help().argv;
};
/* eslint-enable */

module.exports = yargsHelp;
