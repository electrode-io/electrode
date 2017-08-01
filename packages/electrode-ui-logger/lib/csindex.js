"use strict";
/*
 * This file is intended to be executed by browsers only
 */

/* eslint-disable */

var stringify = require('json-stringify-safe');
var safeEventBuilder = require("./safe-event-builder");
var Log = require("./logger");

// Require the fetch polyfill
require("whatwg-fetch");

Log._stream = [];
Log.fetch = window.fetch;
Log.config = require("electrode-ui-config");

Log.setFetch = function (_fetch) {
  Log.fetch = _fetch;
};

Log.setConfig = function (_config) {
  Log.config = _config;
};

Log._flush = function () {
  if (Log._stream.length > 0) {
    var payload = {
      credentials: "include",
      disableAnalytics: true,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: stringify(Log._stream)
    };

    Log._stream = [];

    return Log.fetch(Log.config.fullApiPath("/logger"), payload);
  }
};

Log.setLogInterval = function (_interval) {
  Log._interval = _interval;

  if (Log._poll) {
    clearInterval(Log._poll);
  }

  Log._poll = setInterval(Log._flush, Log._interval);
};

Log.setLogInterval(10000);

Log._addLogMessage = function (data) {
  Log._stream.push(data);
};

// The client logger has an extra endpoint for analytics events
Log.addLogEvent = function (evt) {
  if (evt._type === "log") {
    Log._stream.push({
      tags: [evt.level],
      data: {
        content: evt.content,
        context: evt.context
      }
    });
    if (process.env.NODE_ENV !== "production") {
      console.log(["log", evt.level, evt.content]); // eslint-disable-line no-console
    }
  } else {
    /* eslint-disable no-lonely-if */
    if (process.env.NODE_ENV !== "production") {
      console.log(evt); // eslint-disable-line no-console
    }
    Log._stream.push({tags: ["info"], data: safeEventBuilder(evt)});
  }
};

module.exports = Log;
