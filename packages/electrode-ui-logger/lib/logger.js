/*
 * This file is intended to be executed by browsers and server
 */

/* eslint-disable */

var Log;

function log(level, data, opts) {
  Log._addLogMessage({tags: typeof level === "string" ? [level] : level, data: data}, opts);
}

function flush() {
  Log._flush();
}

Log = {
  info: function (data, opts) {
    log(["info"], data, opts);
  },

  warn: function (data, opts) {
    log(["warn"], data, opts);
  },

  fatal: function (data, opts) {
    log(["fatal"], data, opts);
  },

  error: function (data, opts) {
    log(["error"], data, opts);
  },

  debug: function (data, opts) {
    log(["debug"], data, opts);
  },

  trace: function (data, opts) {
    log(["trace"], data, opts);
  },

  log: log,

  flush: flush
};

module.exports = Log;

