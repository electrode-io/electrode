"use strict";

const sinon = require("sinon");
const assert = require("assert");

const electrodeIgnite = require("../../cli/ignite");
const logger = require("ignite-core/lib/logger");
const chalk = require("chalk");
const pkg = require("../../package.json");

describe.skip("electrode-ignite", function() {
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
  });

  afterEach(function() {
    loggerStub.restore();
  });

  it("Print welcome message", function() {
    electrodeIgnite();
    sinon.assert.callCount(loggerStub, 2);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(`Welcome to electrode-ignite version ${pkg.version}`)
    );
  });
});
