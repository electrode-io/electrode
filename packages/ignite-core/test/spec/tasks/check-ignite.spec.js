"use strict";

const rewire = require("rewire");
const xsh = require("xsh");
const sinon = require("sinon");
const assert = require("assert");
const chalk = require("chalk");
const fs = require("fs");

const logger = require("../../../lib/logger");
const checkIgnite = rewire("../../../tasks/check-ignite");

function foo() {
  return;
}

describe("ignite-core: check-ignite", function() {
  let loggerStub;
  let existsSyncStub;
  let xshStub;
  let processStub;

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    processStub = sinon.stub(process, "exit");
    xshStub = sinon.stub(xsh, "exec");
    xshStub.withArgs(true, "npm ls -g -j --depth=0 electrode-ignite").returns(
      Promise.resolve({
        stdout: JSON.stringify({
          dependencies: {
            "electrode-ignite": {
              version: "0.1.0"
            }
          }
        })
      })
    );
    xshStub.withArgs(true, "npm install -g electrode-ignite@1.0.0").returns(
      Promise.resolve({
        stdout: "1.0.0\n"
      })
    );
    existsSyncStub = sinon.stub(fs, "existsSync");
  });

  afterEach(function() {
    loggerStub.restore();
    xshStub.restore();
    existsSyncStub.restore();
    processStub.restore();
  });

  it("igniteUpToDate", function() {
    const igniteUpToDate = checkIgnite.__get__("igniteUpToDate");
    igniteUpToDate("oss", "installation", "0.1.0", null, "electrode-ignite");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan(
        "Congratulations! You've aleady installed the latest electrode-ignite@0.1.0."
      )
    );
  });

  it("checkInstalledIgnite", function() {
    const checkInstalledIgnite = checkIgnite.__get__("checkInstalledIgnite");
    checkInstalledIgnite("electrode-ignite").then(function(ver) {
      assert.equal(ver, "0.1.0");
    });
  });

  it("installLatestIgnite", function(done) {
    const installLatestIgnite = checkIgnite.__get__("installLatestIgnite");
    installLatestIgnite("electrode-ignite", "1.0.0").then(function() {
      assert.equal(
        loggerStub.getCalls()[1].args.toString(),
        chalk.cyan("electrode-ignite updated to 1.0.0.")
      );
      assert.equal(
        loggerStub.getCalls()[2].args.toString(),
        chalk.cyan("Exiting..., please run your command again.")
      );
      sinon.assert.callCount(processStub, 1);
      done();
    });
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan("Please hold, trying to update.")
    );
  });

  it("cancelLatestIgnite", function() {
    const cancelLatestIgnite = checkIgnite.__get__("cancelLatestIgnite");
    cancelLatestIgnite("0.1.0", "1.0.0", "oss", foo, false);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan("You've cancelled the electrode-ignite@1.0.0 installation.")
    );
  });

  it("invalidProceedOption", function() {
    const invalidProceedOption = checkIgnite.__get__("invalidProceedOption");
    invalidProceedOption(
      "oss",
      "installation",
      "0.1.0",
      "0.1.0",
      null,
      "electrode-ignite",
      false,
      {
        close: foo
      }
    );
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan("Please provide 'y' or 'n'.")
    );
  });
});
