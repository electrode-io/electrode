"use strict";

const fs = require("fs");
const Path = require("path");
const errorHandler = require("../lib/error-handler");

const fileName =
  process.platform === "win32" ? "timestamp-wml.txt" : "timestamp-oss.txt";
const timeStampPath = Path.resolve(__dirname, "..", fileName);

const setTimeStamp = time => {
  if (!fs.existsSync(timeStampPath)) {
    fs.writeFileSync(timeStampPath, time, { flag: "wx" }, err => {
      if (err) {
        errorHandler(err, `Saving timestamp to directory ${timeStampPath}.`);
      }
    });
  } else {
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
  }
};

const checkTimestamp = () => {
  if (!fs.existsSync(timeStampPath)) {
    return true;
  } else {
    const data = fs.readFileSync(timeStampPath).toString().trim();
    if (new Date().toDateString() !== data) {
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
