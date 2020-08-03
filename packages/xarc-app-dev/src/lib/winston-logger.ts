/* eslint-disable @typescript-eslint/no-var-requires */
export {};

/* eslint-disable no-magic-numbers */

const makeWinstonLogger = (winston, handlers = true, options: any = {}) => {
  return new winston.Logger({
    exceptionHandlers: handlers && [
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
      options.noConsole ||
        new winston.transports.Console({
          level: "info",
          colorize: true,
          prettyPrint: true
        }),
      new winston.transports.File({
        json: true,
        maxsize: 10 * 1024 * 1024, // 10 MB
        maxFiles: 1,
        name: "archetype-debug-file",
        filename: options.debugFilename || "archetype-debug.log",
        level: "debug"
      })
    ].filter(x => x)
  });
};

module.exports = makeWinstonLogger;
