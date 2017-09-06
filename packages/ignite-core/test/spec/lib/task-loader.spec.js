"use strict";

const sinon = require("sinon");
const chalk = require("chalk");
const assert = require("assert");

const taskLoader = require("../../../lib/task-loader");
const logger = require("../../../lib/logger");

function foo() {
  return;
}

describe.skip("ignite-core:task-loader", function() {
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

  it("Option#3 generate app", function() {
    taskLoader("3", "oss", foo);
    assert.equal(
      loggerStub.getCalls().length,
      0
    );
  });

  it("Option#4 generate component", function() {
    taskLoader("4", "oss", foo);
    assert.equal(
      loggerStub.getCalls().length,
      0
    );
  });

  it("Option#5 add component", function() {
    taskLoader("5", "oss", foo);
    assert.equal(
      loggerStub.getCalls().length,
      0
    );
  });

  it("Option#6 open docs", function() {
    taskLoader("6", "oss", foo);
    assert.equal(
      loggerStub.getCalls().length,
      1
    );
  });

  it("Option#7 electrode-ignite", function() {
    taskLoader("7", "oss", foo);

    sinon.assert.callCount(loggerStub, 2);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking for electrode-ignite update...")
    );
  });

  it("Option#8 exit the app", function() {
    taskLoader("8", "oss", foo);

    sinon.assert.callCount(loggerStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("You've successfully exit Electrode Ignite.")
    );
  });
});
