/* eslint-disable global-require, @typescript-eslint/no-var-requires */

export const logger = {
  _logger: undefined,

  doLog(level, ...args: any[]) {
    if (!this._logger) {
      try {
        this._logger = require("@xarc/app-dev/lib/logger").logger;
      } catch (e) {
        this._logger = console;
      }
    }

    return this._logger[level](...args);
  },

  info(...args) {
    return this.doLog("info", ...args);
  },

  warn(...args) {
    return this.doLog("warn", ...args);
  },

  error(...args) {
    return this.doLog("error", ...args);
  },

  debug(...args) {
    return this.doLog("debug", ...args);
  }
};
