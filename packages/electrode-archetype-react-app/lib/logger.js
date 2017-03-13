"use strict";

const archetype = require("../config/archetype");
const devRequire = archetype.devRequire;

if (devRequire) {
  const winston = devRequire("winston");
  const logger = new (winston.Logger)({
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
        name: "archetype-loggers-file",
        filename: "archetype-loggers.log",
        level: "debug"
      })
    ]
  });
  module.exports = logger;
} else {
  console.verbose = function () {
    const args = Array.prototype.slice.call(arguments);
    args.unshift("Verbose: ");
    console.log.apply(console.args); // eslint-disable-line
  };

  console.debug = function () {
    const args = Array.prototype.slice.call(arguments);
    args.unshift("Debug: ");
    console.log.apply(console.args); // eslint-disable-line
  };

  module.exports = console;
}
