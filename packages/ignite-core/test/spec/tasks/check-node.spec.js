"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");

const logger = require("../../../lib/logger");
const chalk = require("chalk");
const xsh = require("xsh");
const readline = require("readline");

const CLISpinner = require("cli-spinner").Spinner;
const spinner = new CLISpinner(chalk.green("%s"));

const checkNode = rewire("../../../tasks/check-node");

function foo() {
  return;
}

describe("ignite-core: check node env", function() {
  let xshStub = "";
  let loggerStub = "";
  let processStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    xshStub = sinon.stub(xsh, "exec");
    processStub = sinon.stub(process, "exit");
  });

  afterEach(function() {
    xshStub.restore();
    loggerStub.restore();
    processStub.restore();
  });

  it("checkNode: error", function(done) {
    xshStub.withArgs(true, "npm -v").returns(Promise.reject());
    checkNode("oss", foo, spinner).then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.red("Failed at: Checking node env.")
      );
      done();
    });
  });

  it("checkNode: igniteCore is null", function(done) {
    xshStub.withArgs(true, "npm -v").returns(Promise.resolve({ stdout: "3.10.0\n" }));
    const readlineInterface = {
      question: () => {},
      close: () => {}
    };
    sinon.stub(readlineInterface, "close");
    sinon.stub(readline, "createInterface").returns(readlineInterface);
    checkNode("oss", null, spinner).then(function() {
      assert(readlineInterface.close);
      readline.createInterface.restore();
      readlineInterface.close.restore();
      done();
    });
  });

  it("printNodeCheckLog", function() {
    xshStub.withArgs(true, "npm -v").returns(Promise.resolve({ stdout: "3.10.0\n" }));
    const originalVersion = Object.getOwnPropertyDescriptor(process, "version");
    Object.defineProperty(process, "version", {
      value: "v5.0.0"
    });
    const printNodeCheckLog = checkNode.__get__("printNodeCheckLog");
    printNodeCheckLog();
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan("Your Node version is: 5.0.0")
    );
    assert.equal(
      loggerStub.getCalls()[1].args.toString(),
      chalk.yellow("Your Node version is: 5.0.0. We recommend use Node LTS version 6.\n")
    );
    Object.defineProperty(process, "version", originalVersion);
  });

  it("printnpmCheckLog", function() {
    xshStub.withArgs(true, "npm -v").returns(Promise.resolve({ stdout: "3.10.0\n" }));
    const printnpmCheckLog = checkNode.__get__("printnpmCheckLog");
    printnpmCheckLog({
      stdout: "2.0.0\n"
    });
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan("Your npm version is: 2.0.0")
    );
    assert.equal(
      loggerStub.getCalls()[1].args.toString(),
      chalk.yellow("Your npm version is: 2.0.0. Electrode requires npm version 3 and up.\n")
    );
  });

  it("check node environment on mac", function(done) {
    xshStub.withArgs(true, "npm -v").returns(Promise.resolve({ stdout: "3.10.0\n" }));
    const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform");
    const originalVersion = Object.getOwnPropertyDescriptor(process, "version");
    const originalPath = Object.getOwnPropertyDescriptor(process, "execPath");
    Object.defineProperty(process, "platform", {
      value: "mac"
    });
    Object.defineProperty(process, "version", {
      value: "v6.10.3"
    });
    Object.defineProperty(process, "execPath", {
      value: "/test/path"
    });

    checkNode("oss", foo, spinner).then(function() {
      sinon.assert.callCount(loggerStub, 6);
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.cyan("Your Node version is: 6.10.3")
      );
      assert.equal(
        loggerStub.getCalls()[1].args.toString(),
        chalk.yellow(`You are using Node version 6.10.3. Electrode should work for you.\n`)
      );
      assert.equal(
        loggerStub.getCalls()[2].args.toString(),
        chalk.cyan(`Your npm version is: 3.10.0`)
      );
      assert.equal(
        loggerStub.getCalls()[3].args.toString(),
        chalk.yellow(`You are using npm version 3.10.0. Electrode should work for you.\n`)
      );
      assert.equal(
        loggerStub.getCalls()[4].args.toString(),
        chalk.cyan(`Your Node binary path is: /test/path\n`)
      );

      Object.defineProperty(process, "platform", originalPlatform);
      Object.defineProperty(process, "version", originalVersion);
      Object.defineProperty(process, "execPath", originalPath);
      done();
    });
  });

  it("check node environment on windows", function(done) {
    xshStub.withArgs(true, "npm -v").returns(Promise.resolve({ stdout: "3.10.0\n" }));
    const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform");
    const originalVersion = Object.getOwnPropertyDescriptor(process, "version");
    const originalPath = Object.getOwnPropertyDescriptor(process, "execPath");
    Object.defineProperty(process, "platform", {
      value: "win32"
    });
    Object.defineProperty(process, "version", {
      value: "v6.10.3"
    });
    Object.defineProperty(process, "execPath", {
      value: "/test/path"
    });

    checkNode("oss", foo, spinner).then(function() {
      sinon.assert.callCount(loggerStub, 6);
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.cyan("Your Node version is: 6.10.3")
      );
      assert.equal(
        loggerStub.getCalls()[1].args.toString(),
        chalk.yellow(`You are using Node version 6.10.3. Electrode should work for you.\n`)
      );
      assert.equal(
        loggerStub.getCalls()[2].args.toString(),
        chalk.cyan(`Your npm version is: 3.10.0`)
      );
      assert.equal(
        loggerStub.getCalls()[3].args.toString(),
        chalk.yellow(`You are using npm version 3.10.0. Electrode should work for you.\n`)
      );
      assert.equal(
        loggerStub.getCalls()[4].args.toString(),
        chalk.cyan(`Your Node binary path is: /test/path\n`)
      );

      Object.defineProperty(process, "platform", originalPlatform);
      Object.defineProperty(process, "version", originalVersion);
      Object.defineProperty(process, "execPath", originalPath);
      done();
    });
  });
});
