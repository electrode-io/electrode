"use strict";

const chalk = require("chalk");
const sinon = require("sinon");
const assert = require("assert");
const readline = require("readline");
const logger = require("../../lib/logger");

const mock = require("mock-require");
mock("../../tasks/installation", "./utils/utils");
mock("../../tasks/check-node", "./utils/utils");
mock("../../tasks/check-ignite", "./utils/utils");

const testModule = require("../../ignite");

describe("ignite-core: ignite", function() {
  let loggerStub;
  let processStub;
  let readlineInterface = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    processStub = sinon.stub(process, "exit");
    readlineInterface = {
      question: () => {},
      close: () => {}
    };
    sinon.stub(readlineInterface, "question");
    sinon.stub(readlineInterface, "close");
    sinon.stub(readline, "createInterface").returns(readlineInterface);
  });

  afterEach(function() {
    loggerStub.restore();
    processStub.restore();
    readline.createInterface.restore();
    readlineInterface.question.restore();
    readlineInterface.close.restore();
  });

  it("task: install", function() {
    testModule("oss", "install");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking your Electrode environment...")
    );
  });

  it("task: check-nodejs", function() {
    testModule("oss", "check-nodejs");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking your NodeJS and npm environment...")
    );
  });

  it("task: docs", function() {
    testModule("oss", "docs");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(
        "You've successfully opened the oss gitbook. Please checkout your browser."
      )
    );
  });

  it("task: check-ignite", function() {
    testModule("oss", "check-ignite");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking for electrode-ignite update...")
    );
  });

  it("task: others", function() {
    testModule("oss", "others");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.red(
        `The task name "" you\'ve provided appears to be invalid.\nPlease use "ignite --help" to check all the available tasks.`
      )
    );
  });
});
