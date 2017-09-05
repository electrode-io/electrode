"use strict";

const chalk = require("chalk");
const sinon = require("sinon");
const assert = require("assert");

const testModule = require("../../../lib/back-to-menu");
const logger = require("../../../lib/logger");

function foo() {
  logger.log(
    chalk.green("igniteCore Being Called.")
  );
  return;
}

describe("Back to menu", () => {
  let loggerStub;
  let processStub;

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    processStub = sinon.stub(process, "exit");
  });

  afterEach(function() {
    loggerStub.restore();
    processStub.restore();
  });

  it("Show the hint of returning back to menu", () => {
    testModule("oss", null, true);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Return to the main menu. Please choose your next task:")
    );
    sinon.assert.callCount(processStub, 1);
  });

  it("Does not show the hint of returning back to menu, but called igniteCore", () => {
    testModule("oss", foo, false);
    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("igniteCore Being Called.")
    );
  });
});
