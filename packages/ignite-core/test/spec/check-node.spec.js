"use strict";

const sinon = require("sinon");
const assert = require("assert");

const logger = require("../../lib/logger");
const chalk = require("chalk");
const xsh = require("xsh");

const checkNode = require("../../tasks/check-node");

describe("ignite-core: check-node.spec.js", function() {
  let xshStub = "";
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    xshStub = sinon.stub(xsh, "exec");
    xshStub
      .withArgs(true, "node -v")
      .returns(Promise.resolve({ stdout: "6.10.3\n" }));
    xshStub
      .withArgs(true, "npm -v")
      .returns(Promise.resolve({ stdout: "3.10.0\n" }));
    xshStub.withArgs(true, "which node").returns(Promise.resolve({ stdout: "node path\n" }));
    xshStub.withArgs(true, "where node").returns(Promise.resolve({ stdout: "windows node path\n" }));
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
    Object.defineProperty(process, "platform", {
      value: "mac"
    });

    checkNode().then(function() {
      sinon.assert.callCount(loggerStub, 3);
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.green("Your Node version is: 6.10.3")
      );
      assert.equal(
        loggerStub.getCalls()[1].args.toString(),
        chalk.green("Your npm version is: 3.10.0")
      );
      assert.equal(
        loggerStub.getCalls()[2].args.toString(),
        chalk.green("Your Node binary path is: node path")
      );

      Object.defineProperty(process, "platform", originalPlatform);
      done();
    });
  });

  it("check node environment on window", function(done) {
    const originalPlatform = Object.getOwnPropertyDescriptor(
      process,
      "platform"
    );
    Object.defineProperty(process, "platform", {
      value: "win32"
    });

    checkNode().then(function() {
      sinon.assert.callCount(loggerStub, 3);
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.green("Your Node version is: 6.10.3")
      );
      assert.equal(
        loggerStub.getCalls()[1].args.toString(),
        chalk.green("Your npm version is: 3.10.0")
      );
      assert.equal(
        loggerStub.getCalls()[2].args.toString(),
        chalk.green("Your Node binary path is: windows node path")
      );

      Object.defineProperty(process, "platform", originalPlatform);
      done();
    });
  });
});
