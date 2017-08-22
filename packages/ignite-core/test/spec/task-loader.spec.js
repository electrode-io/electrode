"use strict";

const sinon = require("sinon");
const chalk = require("chalk");
const assert = require("assert");

const taskLoader = require("../../lib/task-loader");
const logger = require("../../lib/logger");

function foo() {
  return;
}

describe("ignite-core:task-loader", function() {
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
  });

  afterEach(function() {
    loggerStub.restore();
  });

  it("Option#1 installation", function() {
    taskLoader("1", "oss", foo);

    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking your Electrode environment...")
    );
  });

  it("Option#2 check node env", function() {
    taskLoader("2", "oss", foo);

    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking your NodeJS and npm environment...")
    );
  });

  it("Option#7 exit the app", function() {
    taskLoader("7", "oss", foo);

    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("You've successfully exit Electrode Ignite.")
    );
  });
});
