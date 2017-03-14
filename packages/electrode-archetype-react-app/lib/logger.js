"use strict";

const archetype = require("../config/archetype");
const devRequire = archetype.devRequire;

const internalWinsonLogger = function() {
  const winston = devRequire("winston");
  return new (winston.Logger)({
    exceptionHandlers: [
      new (winston.transports.File)({
        filename: "archetype-exceptions.log"
      })
    ],
    transports: [
      new (winston.transports.Console)({
        level: "info",
        colorize: true,
        prettyPrint: true
      }),
      new (winston.transports.File)({
        name: "archetype-debug-file",
        filename: "archetype-debug.log",
        level: "debug"
      })
    ]
  });
}

const internalConsoleLogger = function(type, params) {
  if(params) {
    const args = Array.prototype.slice.call(params);
    args.unshift(`${type}:`);
    switch(type) {
      case 'warn':
        console.warn.apply(console, args); // eslint-disable-line
        break;
      case 'error':
        console.error.apply(console, args); // eslint-disable-line
        break;
      default:
        console.log.apply(console, args); // eslint-disable-line
        break;
    }
  }
}

if (devRequire) {
  module.exports = internalWinsonLogger();
} else {
  const logger = {
    info: function() { internalConsoleLogger("info", arguments)},
    warn: function() { internalConsoleLogger("warn", arguments)},
    error: function() { internalConsoleLogger("error", arguments)},
    verbose: function() { internalConsoleLogger("info", arguments)}
  }
  module.exports = logger;
}
