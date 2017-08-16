"use strict";

const errorHandler = require("../lib/error-handler");
const opn = require("opn");
const logger = require("../lib/logger");
const chalk = require("chalk");

const electrodeDocs = function(type) {
  var gitbookURL = "";
  if (type === "oss") {
    gitbookURL = "https://docs.electrode.io/";
  } else if (type === "wml") {
    gitbookURL = "http://gitbook.qa.walmart.com/books/electrode-dev-guide/";
  } else {
    errorHandler("Please provide a valid type");
  }

  if (process.platform.startsWith("win")) {
    opn(gitbookURL)
      .then(function() {
        logger.log(
          chalk.green(
            "You've successfully opened the oss gitbook. Please checkout your browser."
          )
        );
        return process.exit(0);
      })
      .catch(function(e) {
        errorHandler("Failed at open a new browser on windows", e);
      });
  } else {
    try {
      opn(gitbookURL);
      logger.log(
        chalk.green(
          "You've successfully opened the oss gitbook. Please checkout your browser."
        )
      );
      return process.exit(0);
    } catch (e) {
      errorHandler("Failed at open a new browser on windows", e);
    }
  }
};

module.exports = electrodeDocs;
