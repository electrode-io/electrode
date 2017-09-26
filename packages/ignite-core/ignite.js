"use strict";

const chalk = require("chalk");
const Yargs = require("yargs");
const readline = require("readline");

const errorHandler = require("./lib/error-handler");
const igniteMenu = require("./lib/menu");
const taskLoader = require("./lib/task-loader");
const usage = require("./lib/usage");
const yargsHelp = require("./lib/yargs-help");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

yargsHelp();

function igniteCore(type, task) {
  switch (task) {
    case undefined:
      igniteMenu(type, igniteCore, rl);
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
        `The task name "${chalk.redBright(
          Yargs.argv._
        )}" you've provided appears to be invalid.\n` +
          `Please use "ignite --help" to check all the available tasks.`
      );
  }
};

module.exports = igniteCore;
