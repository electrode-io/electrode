"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");

const logger = require("../../lib/logger");
const chalk = require("chalk");

const docs = rewire("../../tasks/docs");
const printSucessLogs = docs.__get__("printSucessLogs");

function foo() {
  return;
}

describe.skip("ignite-core:docs", function() {
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
  });

  afterEach(function() {
    loggerStub.restore();
  });

  it("Print success logs", function() {
    printSucessLogs("oss", null, false);
    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(
        "You've successfully opened the oss gitbook. Please checkout your browser."
      )
    );
  });

  it("Print success logs and return back to menu", function() {
    printSucessLogs("oss", foo, false);
    sinon.assert.callCount(loggerStub, 2);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(
        "You've successfully opened the oss gitbook. Please checkout your browser."
      )
    );
    assert.equal(
      loggerStub.getCalls()[1].args.toString(),
      chalk.green(
        "Please choose your next task:"
      )
    );
  });
});
