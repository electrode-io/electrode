"use strict";

/* eslint-disable global-require */

let logger;

function getLogger() {
  if (!logger) {
    try {
      logger = require("@xarc/app-dev/lib/logger");
    } catch (e) {
      logger = require("./console-logger");
    }
  }
  return logger;
}

module.exports = getLogger();
