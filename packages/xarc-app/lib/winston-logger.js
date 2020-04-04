"use strict";

/* eslint-disable no-magic-numbers */

const makeWinstonLogger = winston => {
  return new winston.Logger({
    exceptionHandlers: [
      new winston.transports.Console({
        colorize: true,
        prettyPrint: true
      }),
      new winston.transports.File({
        json: false,
        maxsize: 5 * 1024 * 1024, // 5 MB
        maxFiles: 1,
        filename: "archetype-exceptions.log"
      })
    ],
    transports: [
      // new winston.transports.Console({
      //   level: "error",
      //   colorize: true,
      //   prettyPrint: true
      // }),
      new winston.transports.File({
        json: true,
        maxsize: 10 * 1024 * 1024, // 10 MB
        maxFiles: 1,
        name: "archetype-debug-file",
        filename: "archetype-debug.log",
        level: "debug"
      })
    ]
  });
};

module.exports = makeWinstonLogger;
