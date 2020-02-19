"use strict";

const webpack = require("webpack");

let lastPct;
let currentRun = 0;
let lastMsg;
let noChangeCount = 0;

/* eslint-disable max-statements */
module.exports = function() {
  return {
    plugins: [
      new webpack.ProgressPlugin((pct, msg) => {
        pct = Math.ceil(pct * 100);
        if (msg === lastMsg && lastPct === pct && ++noChangeCount < 10) {
          return;
        }
        noChangeCount = 0;
        if (pct >= 100) {
          lastPct = undefined;
          process.stdout.write("\n");
          return;
        } else {
          lastPct = pct;
        }
        if (lastMsg !== msg || currentRun >= 78) {
          const x = `${pct === 0 ? "webpack " : "  "}${msg}: `;
          lastMsg = msg;
          currentRun = x.length;
          process.stdout.write(`\n${x}`);
        }
        currentRun++;
        process.stdout.write(".");
      })
    ]
  };
};
