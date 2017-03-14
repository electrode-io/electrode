"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");
const winston = require("winston");
const winstonLogger = require("../lib/winston-logger");

describe("#winston-logger", function () {
  it("#winstonLogger.warn", function () {
    const winstonWarnSpy = sinon.spy(winston, "warn");

    winstonLogger(winston).warn("electrode");

    expect(winstonWarnSpy).calledOnce;
    expect(winstonLogger(winston)).to.be.instanceof(winston.Logger);
    expect(winstonLogger(winston).exceptionHandlers.file.filename).to.equal("archetype-exceptions.log");

    expect(winstonLogger(winston).transports.console.level).to.equal("info");
    expect(winstonLogger(winston).transports.console.colorize).to.be.true;
    expect(winstonLogger(winston).transports.console.prettyPrint).to.be.true;

    expect(winstonLogger(winston).transports["archetype-debug-file"].name).to.equal("archetype-debug-file");
    expect(winstonLogger(winston).transports["archetype-debug-file"].filename).to.equal("archetype-debug.log");
    expect(winstonLogger(winston).transports["archetype-debug-file"].level).to.equal("debug");
  });

  it("#winstonLogger.error", function () {
    const winstonErrorSpy = sinon.spy(winston, "error");

    winstonLogger(winston).error("electrode");

    expect(winstonErrorSpy).calledOnce;
    expect(winstonLogger(winston)).to.be.instanceof(winston.Logger);
    expect(winstonLogger(winston).exceptionHandlers.file.filename).to.equal("archetype-exceptions.log");

    expect(winstonLogger(winston).transports.console.level).to.equal("info");
    expect(winstonLogger(winston).transports.console.colorize).to.be.true;
    expect(winstonLogger(winston).transports.console.prettyPrint).to.be.true;

    expect(winstonLogger(winston).transports["archetype-debug-file"].name).to.equal("archetype-debug-file");
    expect(winstonLogger(winston).transports["archetype-debug-file"].filename).to.equal("archetype-debug.log");
    expect(winstonLogger(winston).transports["archetype-debug-file"].level).to.equal("debug");
  });

  it("#winstonLogger.info", function () {
    const winstonInfoSpy = sinon.spy(winston, "info");

    winstonLogger(winston).info("electrode");

    expect(winstonInfoSpy).calledOnce;
    expect(winstonLogger(winston)).to.be.instanceof(winston.Logger);
    expect(winstonLogger(winston).exceptionHandlers.file.filename).to.equal("archetype-exceptions.log");

    expect(winstonLogger(winston).transports.console.level).to.equal("info");
    expect(winstonLogger(winston).transports.console.colorize).to.be.true;
    expect(winstonLogger(winston).transports.console.prettyPrint).to.be.true;

    expect(winstonLogger(winston).transports["archetype-debug-file"].name).to.equal("archetype-debug-file");
    expect(winstonLogger(winston).transports["archetype-debug-file"].filename).to.equal("archetype-debug.log");
    expect(winstonLogger(winston).transports["archetype-debug-file"].level).to.equal("debug");
  });

  it("#winstonLogger.verbose", function () {
    const winstonVerboseSpy = sinon.spy(winston, "verbose");

    winstonLogger(winston).info("electrode");

    expect(winstonVerboseSpy).calledOnce;
    expect(winstonLogger(winston)).to.be.instanceof(winston.Logger);
    expect(winstonLogger(winston).exceptionHandlers.file.filename).to.equal("archetype-exceptions.log");

    expect(winstonLogger(winston).transports.console.level).to.equal("info");
    expect(winstonLogger(winston).transports.console.colorize).to.be.true;
    expect(winstonLogger(winston).transports.console.prettyPrint).to.be.true;

    expect(winstonLogger(winston).transports["archetype-debug-file"].name).to.equal("archetype-debug-file");
    expect(winstonLogger(winston).transports["archetype-debug-file"].filename).to.equal("archetype-debug.log");
    expect(winstonLogger(winston).transports["archetype-debug-file"].level).to.equal("debug");
  });
});
