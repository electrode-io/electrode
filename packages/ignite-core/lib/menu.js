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
    `[1] Install tools for Electrode development`,
    `[2] Check your NodeJS and npm environment`,
    `[3] Generate an Electrode application`,
    `[4] Generate an Electrode component`,
    `[5] Add a component to your existing component repo`,
    `[6] Electrode official documenations`,
    `[7] Exit`
  ];

  const footer = `---------------------------------------------------------\n`;

  console.log(chalk.cyan(banner)); // eslint-disable-line no-console
  options.forEach((e) => {
    console.log(chalk.cyan(e));  // eslint-disable-line no-console
  });
  console.log(chalk.cyan(footer));  // eslint-disable-line no-console

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

    taskLoader(option, type, igniteCore);
  });
};

module.exports = igniteMenu;
