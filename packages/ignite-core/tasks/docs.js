"use strict";

const errorHandler = require("../lib/error-handler");
const opn = require("opn");
const logger = require("../lib/logger");
const chalk = require("chalk");

const printSucessLogs = function(type, igniteCore) {
  logger.log(
    chalk.green(
      "You've successfully opened the oss gitbook. Please checkout your browser."
    )
  );

  if (type && igniteCore) {
    logger.log(chalk.green("Please choose your next task:"));
    return igniteCore(type);
  }
  return process.exit(0);
};

const electrodeDocs = function(type, igniteCore) {
  var gitbookURL = "";
  if (type === "oss") {
    gitbookURL = "https://docs.electrode.io/";
  } else if (type === "wml") {
    gitbookURL = "http://gitbook.qa.walmart.com/books/electrode-dev-guide/";
  } else {
    errorHandler("Please provide a valid type");
  }

  if (process.platform === "win32") {
    return opn(gitbookURL)
      .then(function() {
        return printSucessLogs(type, igniteCore);
      })
      .catch(function(e) {
        errorHandler("Failed at open a new browser on windows", e);
      });
  } else {
    try {
      opn(gitbookURL);
      return printSucessLogs(type, igniteCore);
    } catch (e) {
      errorHandler("Failed at open a new browser on windows", e);
    }
  }
};

module.exports = electrodeDocs;
