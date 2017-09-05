"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");

const logger = require("../../../lib/logger");
const chalk = require("chalk");

const docs = rewire("../../../tasks/docs");

function foo() {
  return;
}

describe("ignite-core:docs", function() {
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

  it("Print success logs", function() {
    const printSucessLogs = docs.__get__("printSucessLogs");
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
    const printSucessLogs = docs.__get__("printSucessLogs");
    printSucessLogs("oss", foo, false);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(
        "You've successfully opened the oss gitbook. Please checkout your browser."
      )
    );
  });

  it("openDocs on mac platform", function() {
    const openDocs = docs.__get__("openDocs");
    const originalPlatform = Object.getOwnPropertyDescriptor(
      process,
      "platform"
    );
    Object.defineProperty(process, "platform", {
      value: "mac"
    });
    openDocs("git-book-url", "oss", null, false);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green(
        "You've successfully opened the oss gitbook. Please checkout your browser."
      )
    );
    Object.defineProperty(process, "platform", originalPlatform);
  });

  it("openDocs on windows platform", function(done) {
    const openDocs = docs.__get__("openDocs");
    const originalPlatform = Object.getOwnPropertyDescriptor(
      process,
      "platform"
    );
    Object.defineProperty(process, "platform", {
      value: "win32"
    });
    openDocs("git-book-url", "oss", null, false).then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.green(
          "You've successfully opened the oss gitbook. Please checkout your browser."
        )
      );
      Object.defineProperty(process, "platform", originalPlatform);
      done();
    });
  });
});
