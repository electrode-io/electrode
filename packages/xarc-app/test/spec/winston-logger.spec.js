"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");
const winston = require("winston");
const winstonLogger = require("../../lib/winston-logger");

describe.skip("#winston-logger", function() {
  const logger = winstonLogger(winston);

  it("#winstonLogger.warn", function() {
    const winstonWarnSpy = sinon.spy(winston, "warn");

    logger.warn("electrode");

    expect(winstonWarnSpy).calledOnce;
    expect(logger).to.be.instanceof(winston.Logger);
    expect(logger.exceptionHandlers.file.filename).to.equal("archetype-exceptions.log");

    expect(logger.transports.console.level).to.equal("info");
    expect(logger.transports.console.colorize).to.be.true;
    expect(logger.transports.console.prettyPrint).to.be.true;

    expect(logger.transports["archetype-debug-file"].name).to.equal("archetype-debug-file");
    expect(logger.transports["archetype-debug-file"].filename).to.equal("archetype-debug.log");
    expect(logger.transports["archetype-debug-file"].level).to.equal("debug");
  });

  it("#winstonLogger.error", function() {
    const winstonErrorSpy = sinon.spy(winston, "error");

    logger.error("electrode");

    expect(winstonErrorSpy).calledOnce;
    expect(logger).to.be.instanceof(winston.Logger);
    expect(logger.exceptionHandlers.file.filename).to.equal("archetype-exceptions.log");

    expect(logger.transports.console.level).to.equal("info");
    expect(logger.transports.console.colorize).to.be.true;
    expect(logger.transports.console.prettyPrint).to.be.true;

    expect(logger.transports["archetype-debug-file"].name).to.equal("archetype-debug-file");
    expect(logger.transports["archetype-debug-file"].filename).to.equal("archetype-debug.log");
    expect(logger.transports["archetype-debug-file"].level).to.equal("debug");
  });

  it("#winstonLogger.info", function() {
    const winstonInfoSpy = sinon.spy(winston, "info");

    logger.info("electrode");

    expect(winstonInfoSpy).calledOnce;
    expect(logger).to.be.instanceof(winston.Logger);
    expect(logger.exceptionHandlers.file.filename).to.equal("archetype-exceptions.log");

    expect(logger.transports.console.level).to.equal("info");
    expect(logger.transports.console.colorize).to.be.true;
    expect(logger.transports.console.prettyPrint).to.be.true;

    expect(logger.transports["archetype-debug-file"].name).to.equal("archetype-debug-file");
    expect(logger.transports["archetype-debug-file"].filename).to.equal("archetype-debug.log");
    expect(logger.transports["archetype-debug-file"].level).to.equal("debug");
  });

  it("#winstonLogger.verbose", function() {
    const winstonVerboseSpy = sinon.spy(winston, "verbose");

    logger.info("electrode");

    expect(winstonVerboseSpy).calledOnce;
    expect(logger).to.be.instanceof(winston.Logger);
    expect(logger.exceptionHandlers.file.filename).to.equal("archetype-exceptions.log");

    expect(logger.transports.console.level).to.equal("info");
    expect(logger.transports.console.colorize).to.be.true;
    expect(logger.transports.console.prettyPrint).to.be.true;

    expect(logger.transports["archetype-debug-file"].name).to.equal("archetype-debug-file");
    expect(logger.transports["archetype-debug-file"].filename).to.equal("archetype-debug.log");
    expect(logger.transports["archetype-debug-file"].level).to.equal("debug");
  });
});
