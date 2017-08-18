"use strict";

const sinon = require("sinon");
const chalk = require("chalk");
const assert = require("assert");

const taskLoader = require("../../lib/task-loader");
const logger = require("../../lib/logger");

describe("ignite-core:task-loader", function() {
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
  });

  afterEach(function() {
    loggerStub.restore();
  });

  it("Option#1 installation", function() {
    taskLoader("1", "oss");

    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking your Electrode environment...")
    );
  });

  it("Option#2 check node env", function() {
    taskLoader("2", "oss");

    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking your NodeJS and npm environment...")
    );
  });

  // it("Option#6 open docs in a browser", function() {
  //   this.originalPlatform = Object.getOwnPropertyDescriptor(
  //     process,
  //     "platform"
  //   );
  //   Object.defineProperty(process, "platform", {
  //     value: "mac"
  //   });
  //
  //   taskLoader("6", "oss");
  //
  //   sinon.assert.callCount(loggerStub, 1);
  //   assert.equal(
  //     loggerStub.getCalls()[0].args.toString(),
  //     chalk.green(
  //       "You've successfully opened the oss gitbook. Please checkout your browser."
  //     )
  //   );
  // });
});
