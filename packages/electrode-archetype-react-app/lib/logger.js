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
  console.verbose = function (message) {
    console.info(`Verbose: ${message}`);
  };
  module.exports = console;
}
