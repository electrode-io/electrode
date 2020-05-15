"use strict";

/* eslint-disable no-console, no-process-exit */

const readline = require("readline");
const VisualLogger = require("visual-logger");

class ConsoleIO extends VisualLogger {
  constructor(options) {
    super({ ...options, saveLogs: false });
    this.setPrefix("");
  }

  setup() {
    require('fs').createWriteStream('admin-server', { flags: 'a' }).write('reading stddin \n')
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
  }

  async getUserInput() {
    return new Promise(resolve => {
      process.stdin.once("keypress", (str, key) => {
        require('fs').createWriteStream('admin-server', { flags: 'a' }).write(`key: ${str} ${key.name}`)
        if (key.ctrl && key.name === "c") {
          str = "^c";
        }
        resolve({ str: str && str.toLowerCase(), key });
      });
    });
  }

  show(...args) {
    this.log(...args);
  }

  write(str) {
    this.log(str.trimRight());
  }

  exit() {
    this.clearItems();
    process.exit();
  }
}

module.exports = ConsoleIO;
