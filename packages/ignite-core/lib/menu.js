"use strict";

const chalk = require("chalk");
const readline = require("readline");

const taskLoader = require("./task-loader");
const logger = require("./logger");

const EVEN = 2;
const STARNUM = 6;

/* eslint-disable no-console */
const igniteMenu = (type, igniteCore) => {
  const igniteName =
    type === "oss" ? "Electrode Ignite" : "WML Electrode Ignite";
  let option;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  function generateStars() {
    let ret = "";
    for (let i = 0; i < STARNUM; i++) {
      if (i % EVEN === 0) {
        ret += chalk.green(" * ");
      } else {
        ret += chalk.magenta(" * ");
      }
    }
    return ret;
  }

  const banner = function() {
    let ret = "";
    ret += generateStars();
    ret += chalk.blueBright("Electrode Ignite Menu");
    ret += generateStars();
    return ret;
  };

  const dashedLines = `---------------------------------------------------------`;

  const options = [
    `[1] \u2668 Install tools for Electrode development`,
    `[2] \u2611 Check your NodeJS and npm environment`,
    `[3] \u2661 Generate an Electrode application`,
    `[4] \u2606 Generate an Electrode component`,
    `[5] \u272A Add a component to your existing component repo`,
    `[6] \u263A Electrode official documenations`,
    `[7] \u2603 Check for ${igniteName} update`,
    `[8] \u261E Exit`
  ];

  console.log(chalk.blueBright(dashedLines));
  console.log(banner());
  console.log(chalk.blueBright(dashedLines));

  options.forEach((e, i) => {
    if (i % EVEN === 0) {
      console.log(`${chalk.magenta(e)}`);
    } else {
      console.log(`${chalk.green(e)}`);
    }
  });
  console.log(chalk.blueBright(dashedLines));

  rl.question("Please select your option: ", answer => {
    option = answer;

    // Invalid Electrode Option will re-trigger the menu
    if (option < 1 || option > options.length || isNaN(option)) {
      logger.log(
        chalk.red(
          `Please provide a valid option between 1 to ${options.length}.`
        )
      );
      igniteCore(type);
    }

    taskLoader(option, type, igniteCore, true);
  });
};

/* eslint-enable */

module.exports = igniteMenu;
