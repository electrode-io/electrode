/* eslint-disable no-console, no-process-exit, @typescript-eslint/ban-ts-comment */

import readline from "readline";
import VisualLogger from "visual-logger";

export class ConsoleIO extends VisualLogger {
  constructor(options = {}) {
    super({ ...options, saveLogs: false });
    // @ts-ignore
    this.setPrefix("");
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
          str = "^c";
        }
        resolve({ str: str && str.toLowerCase(), key });
      });
    });
  }

  show(...args) {
    // @ts-ignore
    this.log(...args);
  }

  write(str) {
    // @ts-ignore
    this.log(str.trimRight());
  }

  exit() {
    // @ts-ignore
    this.clearItems();
    process.exit();
  }
}
