"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");
const consoleLogger = require("../../lib/console-logger");

describe("#console-logger", function() {
  describe("#consoleLogger.error", function() {
    let consoleErrorSpy;

    beforeEach(function() {
      consoleErrorSpy = sinon.spy(console, "error");
    });

    afterEach(function() {
      consoleErrorSpy.restore();
    });

    it("Should log error message in console", function() {
      consoleLogger.error("electrode");
      expect(consoleErrorSpy).calledOnce;
      expect(consoleErrorSpy.getCall(0).args[0]).to.equal("ERROR:");
      expect(consoleErrorSpy.getCall(0).args[1]).to.equal("electrode");
    });

    it("Should log multi error messages in console", function() {
      consoleLogger.error("hello", "electrode");
      expect(consoleErrorSpy).calledOnce;
      expect(consoleErrorSpy.getCall(0).args[0]).to.equal("ERROR:");
      expect(consoleErrorSpy.getCall(0).args[1]).to.equal("hello");
      expect(consoleErrorSpy.getCall(0).args[2]).to.equal("electrode");
    });
  });

  describe("#consoleLogger.warn", function() {
    let consoleWarnSpy;

    beforeEach(function() {
      consoleWarnSpy = sinon.spy(console, "warn");
    });

    afterEach(function() {
      consoleWarnSpy.restore();
    });

    it("Should log warn message in console", function() {
      consoleLogger.warn("electrode");
      expect(consoleWarnSpy).calledOnce;
      expect(consoleWarnSpy.getCall(0).args[0]).to.equal("WARN:");
      expect(consoleWarnSpy.getCall(0).args[1]).to.equal("electrode");
    });

    it("Should log multi warn messages in console", function() {
      consoleLogger.warn("hello", "electrode");
      expect(consoleWarnSpy).calledOnce;
      expect(consoleWarnSpy.getCall(0).args[0]).to.equal("WARN:");
      expect(consoleWarnSpy.getCall(0).args[1]).to.equal("hello");
      expect(consoleWarnSpy.getCall(0).args[2]).to.equal("electrode");
    });
  });

  describe("#consoleLogger.log", function() {
    let consoleLogSpy;

    beforeEach(function() {
      consoleLogSpy = sinon.spy(console, "log");
    });

    afterEach(function() {
      consoleLogSpy.restore();
    });

    it.skip("consoleLogger.debug should log info message in console", function() {
      consoleLogger.debug("electrode");
      expect(consoleLogSpy).calledOnce;
      expect(consoleLogSpy.getCall(0).args[0]).to.equal("DEBUG:");
      expect(consoleLogSpy.getCall(0).args[1]).to.equal("electrode");
    });

    it.skip("consoleLogger.debug should log multi info message in console", function() {
      consoleLogger.debug("hello", "electrode");
      expect(consoleLogSpy).calledOnce;
      expect(consoleLogSpy.getCall(0).args[0]).to.equal("DEBUG:");
      expect(consoleLogSpy.getCall(0).args[1]).to.equal("hello");
      expect(consoleLogSpy.getCall(0).args[2]).to.equal("electrode");
    });

    it("consoleLogger.verbose should log info message in console", function() {
      consoleLogger.verbose("electrode");
      expect(consoleLogSpy).calledOnce;
      expect(consoleLogSpy.getCall(0).args[0]).to.equal("VERBOSE:");
      expect(consoleLogSpy.getCall(0).args[1]).to.equal("electrode");
    });

    it("consoleLogger.verbose should log multi info message in console", function() {
      consoleLogger.verbose("hello", "electrode");
      expect(consoleLogSpy).calledOnce;
      expect(consoleLogSpy.getCall(0).args[0]).to.equal("VERBOSE:");
      expect(consoleLogSpy.getCall(0).args[1]).to.equal("hello");
      expect(consoleLogSpy.getCall(0).args[2]).to.equal("electrode");
    });
  });
});
