"use strict";

const chalk = require("chalk");
const opn = require("opn");

const backToMenu = require("../lib/back-to-menu");
const errorHandler = require("../lib/error-handler");
const logger = require("../lib/logger");

const printSucessLogs = (type, igniteCore) => {
  logger.log(
    chalk.green(
      "You've successfully opened the oss gitbook. Please checkout your browser."
    )
  );

  return backToMenu(type, igniteCore, true);
};

const electrodeDocs = (type, igniteCore) => {
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
      .then(() => {
        return printSucessLogs(type, igniteCore);
      })
      .catch(e => {
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
