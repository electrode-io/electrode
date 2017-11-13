"use strict";

const { showManualInstallMsg } = require("../../../lib/util/helpers");
const expect = require("chai").expect;
const chalk = require("chalk");
const logger = require("../../../lib/util/logger.js");
const sinon = require("sinon");

describe("showManualInstallMsg", function() {
  let logs = [];
  let logStub;

  beforeEach(() => {
    logs = [];
    logStub = sinon.stub(logger, "log").callsFake(msg => logs.push(msg));
  });

  afterEach(() => {
    logStub.restore();
  });

  it("should show globally manual install messages", () => {
    chalk.enabled = true;
    expect(showManualInstallMsg).to.exist;
    const err = new Error("test");
    showManualInstallMsg(err, {
      name: "test",
      version: "1.0.0",
      isGlobal: true
    });
    expect(logs).to.deep.equal([
      "Unable to install \u001b[32mtest\u001b[39m@\u001b[35m1.0.0\u001b[39m globally.  See above for npm output.",
      "Error: \u001b[31mtest\u001b[39m",
      "Please install it manually.  The command is:",
      "\u001b[35mnpm install -g test@1.0.0\u001b[39m"
    ]);
    chalk.enabled = false;
  });

  it("should show non globally manual install messages", () => {
    chalk.enabled = true;
    expect(showManualInstallMsg).to.exist;
    const err = new Error("test");
    showManualInstallMsg(err, {
      name: "test",
      version: "1.0.0",
      msgs: ["test"],
      isGlobal: false
    });
    expect(logs).to.deep.equal([
      "Unable to install \u001b[32mtest\u001b[39m@\u001b[35m1.0.0\u001b[39m.  See above for npm output.",
      "Error: \u001b[31mtest\u001b[39m",
      "test",
      "Please install it manually.  The command is:",
      "\u001b[35mnpm install  test@1.0.0\u001b[39m"
    ]);
    chalk.enabled = false;
  });
});
