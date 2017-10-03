"use strict";

const sinon = require("sinon");
const chalk = require("chalk");
const assert = require("assert");

const errorHandler = require("../../../lib/error-handler");
const logger = require("../../../lib/logger");

describe("ignite-core:error-hander", function() {
  let loggerStub = "";
  let exitStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    exitStub = sinon.stub(process, "exit");
  });

  afterEach(function() {
    loggerStub.restore();
    exitStub.restore();
  });

  it("print out error message", function() {
    errorHandler("error");

    sinon.assert.callCount(loggerStub, 1);
    assert.equal(loggerStub.getCalls()[0].args.toString(), chalk.red("error"));
    sinon.assert.calledOnce(exitStub);
  });

  it("print out customized & error message", function() {
    errorHandler("error", "message");

    sinon.assert.callCount(loggerStub, 2);
    assert.equal(loggerStub.getCalls()[0].args.toString(), chalk.red("Failed at: message"));
    assert.equal(loggerStub.getCalls()[1].args.toString(), chalk.red("error"));
    sinon.assert.calledOnce(exitStub);
  });
});
