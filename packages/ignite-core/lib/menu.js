"use strict";

const chalk = require("chalk");
const readline = require("readline");

const taskLoader = require("./task-loader");
const logger = require("./logger");

const STARNUM = 8;
const EVEN = 2;

const igniteMenu = function(type, igniteCore) {
  let option;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const banner = function() {
    let ret = "";
    for (let i = 0; i < STARNUM; i++) {
      if (i % EVEN === 0) {
        ret += chalk.magenta("* ");
      } else {
        ret += chalk.green("* ");
      }
    }
    ret += chalk.blueBright("Electrode Ignite Menu");
    for (let i = 0; i < STARNUM; i++) {
      if (i % EVEN === 0) {
        ret += chalk.green(" *");
      } else {
        ret += chalk.magenta(" *");
      }
    }
    return `  ${ret}  `;
  };

  const dashedLines = `---------------------------------------------------------`;

  const options = [
    `[1] \u2668 Install tools for Electrode development`,
    `[2] \u2611 Check your NodeJS and npm environment`,
    `[3] \u2661 Generate an Electrode application`,
    `[4] \u2606 Generate an Electrode component`,
    `[5] \u272A Add a component to your existing component repo`,
    `[6] \u263A Electrode official documenations`,
    `[7] \u261E Exit`
  ];

  console.log(chalk.blueBright(dashedLines)); // eslint-disable-line no-console
  console.log(banner()); // eslint-disable-line no-console
  console.log(chalk.blueBright(dashedLines)); // eslint-disable-line no-console

  options.forEach((e, i) => {
    if (i % EVEN === 0) {
      console.log(`${chalk.magenta(e)}`); // eslint-disable-line no-console
    } else {
      console.log(`${chalk.green(e)}`); // eslint-disable-line no-console
    }
  });
  console.log(chalk.blueBright(dashedLines)); // eslint-disable-line no-console

  rl.question("Please select your option: ", answer => {
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
