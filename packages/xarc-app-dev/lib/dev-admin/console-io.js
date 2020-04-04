"use strict";

/* eslint-disable no-console, no-process-exit */

const readline = require("readline");
const logUpdate = require("log-update");

class ConsoleIO {
  constructor() {
    this._out = process.stdout;
    this.currentStatus = {};
  }

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
    this.clearStatusMessage();
    console.log(...args);
    this.writeStatusMessage();
  }

  write(str) {
    this.clearStatusMessage();
    this._out.write(str);
    this.writeStatusMessage();
  }

  clearStatusMessage(resetTag) {
    const { showing, preserve } = this.currentStatus;
    if (showing) {
      if (resetTag && resetTag !== true && resetTag !== this.currentStatus.tag) {
        this.preserveStatusMsg();
      }
      logUpdate.clear();
      this.currentStatus.showing = false;
    }
    if (resetTag) {
      this.currentStatus = {};
    }
  }

  preserveStatusMsg() {
    if (this.currentStatus.msg && this.currentStatus.preserve) {
      const { tag, msg } = this.currentStatus;
      this.showStatusMessage(tag, msg);
      logUpdate.done();
    }
  }

  showStatusMessage(tag, msg, clearMsg = "") {
    const lineTxt = []
      .concat(msg, clearMsg)
      .filter(x => x)
      .map(line => `${tag}${line}`);
    logUpdate(lineTxt.join("\n"));
    this.currentStatus.showing = true;
  }

  writeStatusMessage(tag, msg, preserve = false, clearMsg = "") {
    if (tag && msg) {
      if (this.currentStatus.tag && this.currentStatus.tag !== tag) {
        this.preserveStatusMsg();
      }
      this.currentStatus = { tag, msg, preserve, clearMsg };
    }
    if (!this.currentStatus.msg) return;

    const { tag: xtag, msg: xmsg } = this.currentStatus;
    this.showStatusMessage(xtag, xmsg, clearMsg);
  }

  exit() {
    this._out.write("\n");
    process.exit();
  }
}

module.exports = ConsoleIO;
