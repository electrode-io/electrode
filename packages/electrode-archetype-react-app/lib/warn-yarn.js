"use strict";

const Fs = require("fs");
const Path = require("path");
const logger = require("./logger");
const myPkg = require("../package.json");

module.exports = () => {
  try {
    Fs.accessSync(Path.resolve("yarn.lock"));
    if (!myPkg.hasOwnProperty("_id")) {
      logger.warn("It looks like you are using yarn.");
      logger.warn("Electrode uses optionalDependencies and yarn doesn't handle them like npm.");
      logger.warn("While it probably works, there may be unexpected issues.");
    }
  } catch (e) {
    //
  }
};
