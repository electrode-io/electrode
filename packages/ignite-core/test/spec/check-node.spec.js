"use strict";

const sinon = require("sinon");
const assert = require("assert");

const logger = require("../../lib/logger");
const chalk = require("chalk");
const xsh = require("xsh");

const CLISpinner = require("cli-spinner").Spinner;
const spinner = new CLISpinner(chalk.green("%s"));

const checkNode = require("../../tasks/check-node");

function foo() {
  return;
}

describe("Check Node Env", function() {
  let xshStub = "";
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    xshStub = sinon.stub(xsh, "exec");
    xshStub
      .withArgs(true, "npm -v")
      .returns(Promise.resolve({ stdout: "3.10.0\n" }));
  });

  afterEach(function() {
    xshStub.restore();
    loggerStub.restore();
  });

  it("check node environment on mac", function(done) {
    const originalPlatform = Object.getOwnPropertyDescriptor(
      process,
      "platform"
    );
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
        chalk.yellow(
          `You are using Node version 6.10.3. Electrode should work for you.\n`
        )
      );
      assert.equal(
        loggerStub.getCalls()[2].args.toString(),
        chalk.cyan(`Your npm version is: 3.10.0`)
      );
      assert.equal(
        loggerStub.getCalls()[3].args.toString(),
        chalk.yellow(
          `You are using npm version 3.10.0. Electrode should work for you.\n`
        )
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
    const originalPlatform = Object.getOwnPropertyDescriptor(
      process,
      "platform"
    );
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
        chalk.yellow(
          `You are using Node version 6.10.3. Electrode should work for you.\n`
        )
      );
      assert.equal(
        loggerStub.getCalls()[2].args.toString(),
        chalk.cyan(`Your npm version is: 3.10.0`)
      );
      assert.equal(
        loggerStub.getCalls()[3].args.toString(),
        chalk.yellow(
          `You are using npm version 3.10.0. Electrode should work for you.\n`
        )
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
