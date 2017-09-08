"use strict";

const sinon = require("sinon");
const assert = require("assert");

const electrodeIgnite = require("../../cli/ignite");
const logger = require("ignite-core/lib/logger");
const chalk = require("chalk");
const pkg = require("../../package.json");

const mock = require("mock-require");
mock("ignite-core/tasks/check-ignite", "./utils/utils");

describe.skip("electrode-ignite", function() {
  let loggerStub = "";
  let processStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    processStub = sinon.stub(process, "exit");
  });

  afterEach(function() {
    loggerStub.restore();
    processStub.restore();
  });

  it("Print welcome message for non-check-ignite tasks", function() {
    electrodeIgnite();
    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(`Welcome to electrode-ignite version ${pkg.version}`)
    );
  });

  it("Print welcome message for check-ignite tasks", function() {
    process.argv[2] = "check-ignite";
    electrodeIgnite();
    sinon.assert.callCount(loggerStub, 2);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(`Welcome to electrode-ignite version ${pkg.version}`)
    );
    assert.equal(
      loggerStub.getCalls()[1].args.toString(),
      chalk.green("Checking latest version available on npm ...")
    );
  });
});
