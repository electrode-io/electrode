"use strict";

/* eslint-disable no-console */

function makeConsoleLogger() {
  const levels = ["info", "warn", "error", "debug", "verbose"];

  function log(level, params) {
    const args = Array.prototype.slice.call(params);
    args.unshift(`${level.toUpperCase()}:`);

    if (console[level]) {
      console[level].apply(console, args); // eslint-disable-line
    } else {
      console.log.apply(console, args); // eslint-disable-line
    }
  }

  return levels.reduce((a, l) => {
    a[l] = function() {
      log(l, arguments);
    };
    return a;
  }, {});
}

module.exports = makeConsoleLogger();
