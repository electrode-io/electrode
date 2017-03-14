"use strict";

const makeWinstonLogger = (winston) => {
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
};

module.exports = makeWinstonLogger;
