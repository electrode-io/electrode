"use strict";

const sinon = require("sinon");
const assert = require("assert");
const xsh = require("xsh");

const electrodeIgnite = require("../../cli/ignite");
const logger = require("ignite-core/lib/logger");
const chalk = require("chalk");
const pkg = require("../../package.json");

describe("electrode-ignite", function() {
  let loggerStub = "";
  let processStub = "";
  let xshStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    processStub = sinon.stub(process, "exit");
    xshStub = sinon.stub(xsh, "exec").returns(Promise.resolve(pkg.version));
  });

  afterEach(function() {
    loggerStub.restore();
    processStub.restore();
    xshStub.restore();
  });

  it("Exit if electrode-ignite version is invalid", () => {
    const originalVersion = pkg.version;
    pkg.version = "fake version";
    electrodeIgnite();
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.red("Your electrode-ignite version@fake version is invalid.")
    );
    sinon.assert.calledOnce(processStub);
    pkg.version = originalVersion;
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
