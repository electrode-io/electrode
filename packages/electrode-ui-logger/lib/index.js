"use strict";

const Log = require("./logger");

const fail = {
  log: (tags, data) => {
    console.error(`Failed to send logs: ${tags} ${data}.`); // eslint-disable-line
  }
};

Log._addLogMessage = function (data, opts) {
  if (!opts || !opts.request) {
    fail.log("Missing request option");
  }
  opts.request.log(data.tags, data.data);
};

Log._flush = function (opts) {
  if (!opts || !opts.request) {
    fail("Missing request option");
  }
  opts.request.log(["warn"], "Log flushing is not valid on server"); //eslint-disable-line
};

Log.addLogEvent = function (evt, opts) {
  if (!opts || !opts.request) {
    fail("Missing request option");
  }
  opts.request.log(["warn"], "Logging analytics events not valid on server");
};

Log.setServer = function (server) {
  this.server = server;
};

module.exports = Log;
