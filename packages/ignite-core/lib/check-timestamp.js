"use strict";

const fs = require("fs");
const Path = require("path");
const errorHandler = require("../lib/error-handler");

const fileName =
  process.platform === "win32" ? "timestamp-wml.txt" : "timestamp-oss.txt";
const timeStampPath = Path.resolve(__dirname, "..", fileName);

function setTimeStamp(time) {
  fs.writeFileSync(
    timeStampPath,
    JSON.stringify(time, null, 2), // eslint-disable-line no-magic-numbers
    { flag: "w" },
    err => {
      if (err) {
        errorHandler(err, `Saving timestamp to directory ${timeStampPath}.`);
      }
    }
  );
}

function checkTimestamp() {
  if (!fs.existsSync(timeStampPath)) {
    return "check";
  } else {
    const data = JSON.parse(fs.readFileSync(timeStampPath, "utf8"));
    if (new Date().toDateString() !== data.time.toString().trim()) {
      return "check";
    } else {
      return {
        latestVersion: data.latestVersion.toString().trim()
      };
    }
  }
}

module.exports = {
  checkTimestamp: checkTimestamp,
  setTimeStamp: setTimeStamp
};
