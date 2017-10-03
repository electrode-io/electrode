"use strict";

const fs = require("fs");
const Path = require("path");
const errorHandler = require("../lib/error-handler");

const fileName = process.platform === "win32" ? "timestamp-wml.txt" : "timestamp-oss.txt";
const timeStampPath = Path.resolve(__dirname, "..", fileName);

function setTimeStamp(obj) {
  if (/^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(obj.latestVersion)) {
    fs.writeFileSync(
      timeStampPath,
      JSON.stringify(obj, null, 2), // eslint-disable-line no-magic-numbers
      { flag: "w" },
      err => {
        if (err) {
          errorHandler(err, `Saving timestamp to directory ${timeStampPath}.`);
        }
      }
    );
  } else {
    errorHandler(
      `Saving an invalid latest version@${obj.latestVersion} to directory ${timeStampPath}.`
    );
  }
}

function checkTimestamp() {
  if (!fs.existsSync(timeStampPath)) {
    return "check";
  } else {
    const data = JSON.parse(fs.readFileSync(timeStampPath, "utf8"));
    const time = data.time.toString().trim();
    const latestVersion = data.latestVersion.toString().trim();

    if (!/^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(latestVersion)) {
      errorHandler(
        `Saving an invalid latest version@${latestVersion} to directory ${timeStampPath}.`
      );
    }

    if (new Date().toDateString() !== time) {
      return "check";
    } else {
      return {
        latestVersion: latestVersion
      };
    }
  }
}

module.exports = {
  checkTimestamp: checkTimestamp,
  setTimeStamp: setTimeStamp
};
