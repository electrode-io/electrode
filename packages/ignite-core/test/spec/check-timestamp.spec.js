"use strict";

const testModule = require("../../lib/check-timestamp");
const checkTimestamp = testModule.checkTimestamp;
const setTimeStamp = testModule.setTimeStamp;

const fs = require("fs");
const sinon = require("sinon");
const assert = require("assert");

describe("Check Timestamp", () => {
  let writeFileSyncStub = "";
  let existsSyncStub = "";
  let readFileSyncStub = "";

  beforeEach(() => {
    writeFileSyncStub = sinon.stub(fs, "writeFileSync");
    existsSyncStub = sinon.stub(fs, "existsSync");
    readFileSyncStub = sinon.stub(fs, "readFileSync");
  });

  afterEach(() => {
    writeFileSyncStub.restore();
    existsSyncStub.restore();
    readFileSyncStub.restore();
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
});
