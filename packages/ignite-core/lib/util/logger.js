"use strict";

const chalk = require("chalk");

const MSEC_IN_SECOND = 1000;
const SEC_IN_MIN = 60;
const DECIMAL_POINTS = 2;
const MSEC_IN_MINUTE = SEC_IN_MIN * MSEC_IN_SECOND;
const DIGIT = 10;

const pad2 = x => {
  return (x < DIGIT ? "0" : "") + x;
};

const timestamp = () => {
  const d = new Date();
  const ts = `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
  return ts;
};

let quiet = false;

module.exports = {
  pad2,
  timestamp,
  formatElapse: elapse => {
    if (elapse >= MSEC_IN_MINUTE) {
      const min = elapse / MSEC_IN_MINUTE;
      return `${min.toFixed(DECIMAL_POINTS)} min`;
    } else if (elapse >= MSEC_IN_SECOND) {
      const sec = elapse / MSEC_IN_SECOND;
      return `${sec.toFixed(DECIMAL_POINTS)} sec`;
    } else {
      return `${elapse} ms`;
    }
  },
  quiet: q => (quiet = q),
  log: (msg, pre) => {
    if (quiet) {
      return;
    }
    process.stdout.write(
      `${pre || ""}${chalk.magenta("[")}${chalk.gray(timestamp())}` +
        `${chalk.magenta("]")} ${msg}\n`
    );
  }
};
