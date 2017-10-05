"use strict";

const { showManualInstallMsg } = require("../../../lib/util/helpers");
const expect = require("chai").expect;
const chalk = require("chalk");

describe("showManualInstallMsg", function() {
  it("should show globally manual install messages", () => {
    chalk.enabled = true;
    expect(showManualInstallMsg).to.exist;
    const err = new Error("test");
    showManualInstallMsg(err, {
      name: "test",
      version: "1.0.0",
      isGlobal: true
    });
    chalk.enabled = false;
  });

  it("should show non globally manual install messages", () => {
    chalk.enabled = true;
    expect(showManualInstallMsg).to.exist;
    const err = new Error("test");
    showManualInstallMsg(err, {
      name: "test",
      version: "1.0.0",
      isGlobal: false
    });
    chalk.enabled = false;
  });
});
