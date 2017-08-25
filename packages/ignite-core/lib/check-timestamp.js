"use strict";

const fs = require("fs");
const errorHandler = require("../lib/error-handler");

const MILISECONDS = 1000;
const HOURS = 24;
const SECONDS = 3600;
const CHECK_INTERVAL = MILISECONDS * HOURS * SECONDS;

const checkTimestamp = () => {
  const timeStampPath = "/tmp/ignite-timestampe.txt";

  if (!fs.existsSync(timeStampPath)) {
    fs.writeFileSync(
      timeStampPath,
      new Date().getTime(),
      { flag: "wx" },
      err => {
        if (err) {
          errorHandler(err, `Saving timestamp to directory ${timeStampPath}.`);
        }
      }
    );
    return true;
  } else {
    const data = fs.readFileSync(timeStampPath);
    if (new Date().getTime() - data.toString() > CHECK_INTERVAL) {
      fs.truncate(timeStampPath, 0, () => {
        fs.writeFileSync(
          timeStampPath,
          new Date().getTime(),
          { flag: "w" },
          error => {
            if (error) {
              errorHandler(
                error,
                `Saving new timestamp to directory ${timeStampPath}.`
              );
            }
          }
        );
      });
      return true;
    } else {
      return false;
    }
  }
};

module.exports = checkTimestamp;
