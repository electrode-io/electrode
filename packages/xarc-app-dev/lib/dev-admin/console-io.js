"use strict";

/* eslint-disable no-console, no-process-exit */

const readline = require("readline");

class ConsoleIO {
  constructor() {}

  setup() {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
  }

  async getUserInput() {
    return new Promise(resolve => {
      process.stdin.once("keypress", (str, key) => {
        if (key.ctrl && key.name === "c") {
          str = "m";
        }
        resolve({ str: str && str.toLowerCase(), key });
      });
    });
  }

  show(...args) {
    console.log(...args);
  }

  write(str) {
    process.stdout.write(str);
    this._newLine = str.endsWith("\n");
  }

  exit() {
    process.exit();
  }
}

module.exports = ConsoleIO;
