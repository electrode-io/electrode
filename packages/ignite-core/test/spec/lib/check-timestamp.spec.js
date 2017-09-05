"use strict";

const testModule = require("../../../lib/check-timestamp");
const logger = require("../../../lib/logger");
const checkTimestamp = testModule.checkTimestamp;
const setTimeStamp = testModule.setTimeStamp;

const fs = require("fs");
const sinon = require("sinon");
const assert = require("assert");
const chalk = require("chalk");
const Path = require("path");

describe("ignite-core: check Timestamp", () => {
  let writeFileSyncStub = "";
  let existsSyncStub = "";
  let readFileSyncStub = "";
  let processStub = "";
  let loggerStub = "";

  beforeEach(() => {
    loggerStub = sinon.stub(logger, "log");
    writeFileSyncStub = sinon.stub(fs, "writeFileSync");
    existsSyncStub = sinon.stub(fs, "existsSync");
    readFileSyncStub = sinon.stub(fs, "readFileSync");
    processStub = sinon.stub(process, "exit");
  });

  afterEach(() => {
    writeFileSyncStub.restore();
    existsSyncStub.restore();
    readFileSyncStub.restore();
    processStub.restore();
    loggerStub.restore();
  });

  it("check timestamp", () => {
    checkTimestamp();
    sinon.assert.callCount(existsSyncStub, 1);
  });

  it("check timestamp if timestamp file does not exists", () => {
    existsSyncStub.returns(false);
    assert.equal(checkTimestamp(), "check");
  });

  it("check timestamp if last check is one day ago", () => {
    existsSyncStub.returns(true);
    readFileSyncStub.returns(
      JSON.stringify({
        time: 0
      })
    );
    assert.equal(checkTimestamp(), "check");
  });

  it("skip check timestamp if last check within one day", () => {
    existsSyncStub.returns(true);
    readFileSyncStub.returns(
      JSON.stringify({
        time: new Date().toDateString(),
        version: "0.1.0",
        latestVersion: "1.0.0"
      })
    );
    assert.equal(checkTimestamp().version, "0.1.0");
    assert.equal(checkTimestamp().latestVersion, "1.0.0");
  });

  it("set timestamp", () => {
    setTimeStamp(0);
    sinon.assert.callCount(writeFileSyncStub, 1);
  });

  it("error when set timestamp", () => {
    const fileName =
      process.platform === "win32" ? "timestamp-wml.txt" : "timestamp-oss.txt";
    const timeStampPath = Path.resolve(__dirname, "..", "..", "..", fileName);
    writeFileSyncStub.yields(new Error());
    setTimeStamp(0);
    sinon.assert.callCount(writeFileSyncStub, 1);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.red(
        `Failed at: Saving timestamp to directory ${timeStampPath}.`
      )
    );
  });
});
