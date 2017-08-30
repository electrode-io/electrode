"use strict";

const fs = require("fs");
const Path = require("path");
const errorHandler = require("../lib/error-handler");

const fileName =
  process.platform === "win32" ? "timestamp-wml.txt" : "timestamp-oss.txt";
const timeStampPath = Path.resolve(__dirname, "..", fileName);

const setTimeStamp = time => {
  fs.truncate(timeStampPath, 0, () => {
    fs.writeFileSync(timeStampPath, time, { flag: "w" }, error => {
      if (error) {
        errorHandler(
          error,
          `Saving new timestamp to directory ${timeStampPath}.`
        );
      }
    });
  });
};

const checkTimestamp = () => {
  if (!fs.existsSync(timeStampPath)) {
    return true;
  } else {
    const data = fs.readFileSync(timeStampPath);
    if (new Date().toDateString() !== data.toString()) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = {
  checkTimestamp: checkTimestamp,
  setTimeStamp: setTimeStamp
};
