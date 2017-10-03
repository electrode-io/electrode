"use strict";

const rewire = require("rewire");
const xsh = require("xsh");
const sinon = require("sinon");
const assert = require("assert");
const chalk = require("chalk");
const fs = require("fs");
const readline = require("readline");

const logger = require("../../../lib/logger");
const checkIgnite = rewire("../../../tasks/check-ignite");

function foo() {
  return;
}

describe("ignite-core: check-ignite", function() {
  let loggerStub;
  let existsSyncStub;
  let readFileSyncStub;
  let xshStub;
  let processStub;
  let writeFileSyncStub;
  let readlineInterface = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    processStub = sinon.stub(process, "exit");
    xshStub = sinon.stub(xsh, "exec");
    existsSyncStub = sinon.stub(fs, "existsSync");
    readFileSyncStub = sinon.stub(fs, "readFileSync");
    writeFileSyncStub = sinon.stub(fs, "writeFileSync");

    readlineInterface = {
      question: () => {},
      close: () => {}
    };
    sinon.stub(readlineInterface, "question");
    sinon.stub(readlineInterface, "close");
    sinon.stub(readline, "createInterface").returns(readlineInterface);

    xshStub.withArgs(true, "npm show electrode-ignite version").returns(
      Promise.resolve({
        stdout: "0.1.0\n"
      })
    );

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
  });

  afterEach(function() {
    loggerStub.restore();
    xshStub.restore();
    existsSyncStub.restore();
    processStub.restore();
    readFileSyncStub.restore();
    writeFileSyncStub.restore();
    readline.createInterface.restore();
    readlineInterface.question.restore();
    readlineInterface.close.restore();
  });

  it("igniteUpToDate", function() {
    const igniteUpToDate = checkIgnite.__get__("igniteUpToDate");
    igniteUpToDate("oss", "installation", "0.1.0", null, "electrode-ignite");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan("Congratulations! You've aleady installed the latest electrode-ignite@0.1.0.")
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
    xshStub.withArgs(true, "npm install -g electrode-ignite@1.0.0").returns(
      Promise.resolve({
        stdout: "1.0.0\n"
      })
    );
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
    invalidProceedOption("oss", "installation", "0.1.0", "0.1.0", null, "electrode-ignite", false, {
      close: foo
    });
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.cyan("Please provide 'y' or 'n'.")
    );
  });

  it("checkIgnite: manual check", function() {
    checkIgnite("oss", null, "electrode-ignite", false, true, "1.0.0");
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("Checking latest version available on npm ...")
    );
  });

  it("checkIgnite: already get the latest verion", function(done) {
    existsSyncStub.returns(true);
    readFileSyncStub.returns(
      JSON.stringify({
        time: new Date().toDateString(),
        latestVersion: "1.0.0"
      })
    );
    checkIgnite("oss", null, "electrode-ignite", false, false, "1.0.0").then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.cyan("Your electrode-ignite is up-to-date.")
      );
      done();
    });
  });

  it("checkIgnite: out-of-date electrode-ignite", function(done) {
    existsSyncStub.returns(true);
    readFileSyncStub.returns(
      JSON.stringify({
        time: new Date().toDateString(),
        latestVersion: "1.0.0"
      })
    );
    checkIgnite("oss", null, "electrode-ignite", false, false, "0.1.0").then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.cyan(
          `electrode-ignite is about to update the following modules globally:\n` +
            `- electrode-ignite (from version 0.1.0 to version 1.0.0)`
        )
      );
      done();
    });
  });

  it("checkIgniteVersion: last check one day ago", function(done) {
    existsSyncStub.returns(true);
    readFileSyncStub.returns(
      JSON.stringify({
        time: 0,
        latestVersion: "1.0.0"
      })
    );
    checkIgnite("oss", null, "electrode-ignite", false, false, "1.0.0").then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.green("Checking latest version available on npm ...")
      );
      done();
    });
  });

  it("checkIgniteVersion: up-to-date", function(done) {
    const checkIgniteVersion = checkIgnite.__get__("checkIgniteVersion");
    xshStub.withArgs(true, "npm show electrode-ignite version").returns(
      Promise.resolve({
        stdout: "0.1.0\n"
      })
    );
    checkIgniteVersion("oss", "electrode-ignite", "0.1.0", null, false).then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.cyan("Congratulations! You've aleady installed the latest electrode-ignite@0.1.0.")
      );
      done();
    });
  });

  it("checkIgniteVersion: out-dated version", function(done) {
    const checkIgniteVersion = checkIgnite.__get__("checkIgniteVersion");
    xshStub.withArgs(true, "npm show electrode-ignite version").returns(
      Promise.resolve({
        stdout: "1.0.0\n"
      })
    );
    checkIgniteVersion("oss", "electrode-ignite", "0.1.0", null, false).then(function() {
      assert(loggerStub.calledOnce);
      done();
    });
  });

  it("checkIgniteVersion: invalid", function(done) {
    const checkIgniteVersion = checkIgnite.__get__("checkIgniteVersion");
    xshStub.withArgs(true, "npm show electrode-ignite version").returns(
      Promise.resolve({
        stdout: "0.1.0\n"
      })
    );
    checkIgniteVersion("oss", "electrode-ignite", "1.0.0", null, false).then(function() {
      assert(loggerStub.calledOnce);
      done();
    });
  });

  it("checkInstalledIgnite: error", function(done) {
    const checkInstalledIgnite = checkIgnite.__get__("checkInstalledIgnite");
    xshStub.withArgs(true, "npm ls -g -j --depth=0 electrode-ignite").returns(Promise.reject());
    checkInstalledIgnite("electrode-ignite").then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.red("Failed at: Error when fetching local installed electrode-ignite.")
      );
      done();
    });
  });

  it("checkIgniteVersion: error", function(done) {
    const checkIgniteVersion = checkIgnite.__get__("checkIgniteVersion");
    xshStub.withArgs(true, "npm show electrode-ignite version").returns(Promise.reject());
    checkIgniteVersion("oss", "electrode-ignite", "0.1.0", null, false).then(function() {
      assert.equal(
        loggerStub.getCalls()[0].args.toString(),
        chalk.red(
          `Failed at: Invalid electrode-ignite in the npm registry.` +
            ` Please report this to Electrode core team.`
        )
      );
      done();
    });
  });
});
