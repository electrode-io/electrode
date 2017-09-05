"use strict";

const rewire = require("rewire");
const sinon = require("sinon");
const assert = require("assert");
const chalk = require("chalk");

const logger = require("../../../lib/logger");
const testModule = rewire("../../../tasks/check-ignite");

describe("ignite-core: check-ignite", function() {
  let loggerStub;

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
  });

  afterEach(function() {
    loggerStub.restore();
  });

  it("igniteUpToDate", function() {
    const igniteUpToDate = testModule.__get__("igniteUpToDate");
    igniteUpToDate("oss", "tasks", "0.1.0", null, "electrode-ignite");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan(
        `Congratulations! You've aleady installed the latest electrode-ignite@0.1.0.`
      )
    );
  });
});
