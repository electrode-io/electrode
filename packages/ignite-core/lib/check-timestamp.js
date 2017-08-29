"use strict";

const fs = require("fs");
const Path = require("path");
const errorHandler = require("../lib/error-handler");

const MILISECONDS = 1000;
const HOURS = 24;
const SECONDS = 3600;
const CHECK_INTERVAL = MILISECONDS * HOURS * SECONDS;

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
    fs.writeFileSync(timeStampPath, 0, { flag: "wx" }, err => {
      if (err) {
        errorHandler(err, `Saving timestamp to directory ${timeStampPath}.`);
      }
    });
    return true;
  } else {
    const data = fs.readFileSync(timeStampPath);
    const curTime = new Date().getTime();
    if (curTime - data.toString() > CHECK_INTERVAL) {
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
