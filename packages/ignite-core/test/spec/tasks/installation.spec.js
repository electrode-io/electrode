"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");
const xsh = require("xsh");
const chalk = require("chalk");
const readline = require("readline");
const expect = require("chai").expect;

const logger = require("../../../lib/logger");
const installation = rewire("../../../tasks/installation");

function foo() {
  return;
}

const spinner = {
  start: foo,
  stop: foo
};

describe("inite-core:installation", function() {
  let xshStub = "";
  let loggerStub = "";
  let processStub = "";
  let readlineInterface = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    processStub = sinon.stub(process, "exit");
    xshStub = sinon.stub(xsh, "exec");
    readlineInterface = {
      question: () => {},
      close: () => {}
    };
    sinon.stub(readlineInterface, "question");
    sinon.stub(readlineInterface, "close");
    sinon.stub(readline, "createInterface").returns(readlineInterface);
    xshStub
      .withArgs(true, "npm ls -g -j --depth=0 xclap-cli")
      .returns(Promise.resolve({ stdout: "1.0.0\n" }));
    xshStub
      .withArgs(true, "npm show xclap-cli version")
      .returns(Promise.resolve({ stdout: "1.0.0\n" }));
    xshStub
      .withArgs("npm install -g xclap-cli")
      .returns(Promise.resolve({ stdout: "xclap-cli@1.0.0\n" }));
  });

  afterEach(function() {
    xshStub.restore();
    loggerStub.restore();
    processStub.restore();
    readline.createInterface.restore();
    readlineInterface.question.restore();
    readlineInterface.close.restore();
  });

  it("installLatestXClapCLI", function(done) {
    const installLatestXClapCLI = installation.__get__("installLatestXClapCLI");
    installLatestXClapCLI(spinner, "oss", null, false).then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.cyan("You've successfully installed the latest xclap-cli@1.0.0.")
      );
      done();
    });
  });

  it("checkLocalXClapCLI", function(done) {
    const checkLocalXClapCLI = installation.__get__("checkLocalXClapCLI");
    checkLocalXClapCLI().then(function() {
      sinon.assert.callCount(xshStub, 1);
      assert.equal(
        xshStub.getCalls()[0].args.toString(),
        "true,npm ls -g -j --depth=0 xclap-cli"
      );
      done();
    });
  });

  it("checkXClapCLILatestVersion", function(done) {
    const checkXClapCLILatestVersion = installation.__get__(
      "checkXClapCLILatestVersion"
    );
    checkXClapCLILatestVersion().then(function() {
      sinon.assert.callCount(xshStub, 1);
      assert.equal(
        xshStub.getCalls()[0].args.toString(),
        "true,npm show xclap-cli version"
      );
      done();
    });
  });

  it("installXClapCLI", function() {
    const installXClapCLI = installation.__get__("installXClapCLI");
    installXClapCLI();
    expect(readline.createInterface.calledOnce).to.be.true;
    expect(readlineInterface.question.calledOnce).to.be.true;
  });
});
