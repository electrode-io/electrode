"use strict";

const chalk = require("chalk");
const readline = require("readline");

const taskLoader = require("./task-loader");
const logger = require("./logger");

const igniteMenu = function(type, igniteCore) {
  let option;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const banner =
    `---------------------------------------------------------\n` +
    `* * * * * * * Electrode Ignite Menu * * * * * * * * * * \n` +
    `---------------------------------------------------------`;

  const options = [
    `Install tools for Electrode development`,
    `Check your NodeJS and npm environment`,
    `Generate an Electrode application`,
    `Generate an Electrode component`,
    `Add a component to your existing component repo`,
    `Electrode official documenations`,
    `Exit`
  ];

  const footer = `---------------------------------------------------------\n`;

  console.log(chalk.cyan(banner)); // eslint-disable-line no-console
  options.forEach((e, i) => {
    console.log(`[${chalk.red(i + 1)}] ${chalk.cyan(e)}`); // eslint-disable-line no-console
  });
  console.log(chalk.cyan(footer)); // eslint-disable-line no-console

  rl.question(chalk.cyan("Please select your option: "), answer => {
    option = answer;

    // Invalid Electrode Option will re-trigger the menu
    while (option < 1 || option > options.length || isNaN(option)) {
      logger.log(
        chalk.red(
          `Please provide a valid option between 1 to ${options.length}.`
        )
      );
      igniteCore(type);
      break;
    }

    return taskLoader(option, type, igniteCore);
  });
};

module.exports = igniteMenu;
