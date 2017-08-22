"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");

const logger = require("../../lib/logger");
const chalk = require("chalk");

const docs = rewire("../../tasks/docs");

describe("ignite-core:docs", function() {
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
  });

  afterEach(function() {
    loggerStub.restore();
  });

  it("Print success logs", function() {
    const printSucessLogs = docs.__get__("printSucessLogs");
    printSucessLogs();
    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(
        "You've successfully opened the oss gitbook. Please checkout your browser."
      )
    );
  });
});
