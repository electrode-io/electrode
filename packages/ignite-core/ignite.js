"use strict";

const Yargs = require("yargs");

const taskLoader = require("./lib/task-loader");
const errorHandler = require("./lib/error-handler");
const usage = require("./lib/usage");
const taskOptions = require("./lib/task-options");
const igniteMenu = require("./lib/menu");

Yargs.usage(usage, taskOptions).help().argv;

const igniteCore = function(type, task) {
  if (!task) {
    igniteMenu(type, igniteCore);
  } else if (task === "install") {
    taskLoader("1", type, igniteCore);
  } else if (task === "check-nodejs") {
    taskLoader("2", type, igniteCore);
  } else if (task === "generate-app") {
    taskLoader("3", type);
  } else if (task === "generate-component") {
    taskLoader("4", type);
  } else if (task === "add-component") {
    taskLoader("5", type);
  } else if (task === "docs") {
    taskLoader("6", type, igniteCore);
  } else {
    errorHandler(
      `The task name "${Yargs.argv._}" you've provided appears to be invalid.\n` +
      `Please use "ignite --help" to check all the available tasks.`
    );
  }
}

module.exports = igniteCore;
