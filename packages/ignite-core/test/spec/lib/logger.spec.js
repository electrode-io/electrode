"use strict";

const testModule = require("../../../lib/logger");
const xstdout = require("xstdout");
const expect = require("chai").expect;

describe("ignite-core: logger", function() {
  it("should log to stdout", () => {
    const intercept = xstdout.intercept(true);
    testModule.log("test");
    intercept.restore();
    expect(intercept.stdout.join("")).include("test");
  });

  it("should pad2 1 to 01", () => {
    expect(testModule.pad2(1)).to.equal("01");
  });

  it("should pad2 12 to 12", () => {
    expect(testModule.pad2(12)).to.equal("12");
  });

  it("formatElapse should format msec to minutes", () => {
    expect(testModule.formatElapse(60000)).to.equal("1.00 min");
    expect(testModule.formatElapse(692384)).to.equal("11.54 min");
  });

  it("formatElapse should format msec to seconds", () => {
    expect(testModule.formatElapse(1000)).to.equal("1.00 sec");
    expect(testModule.formatElapse(14534)).to.equal("14.53 sec");
  });

  it("formatElapse should format msec ", () => {
    expect(testModule.formatElapse(999)).to.equal("999 ms");
    expect(testModule.formatElapse(163)).to.equal("163 ms");
  });

  it("should log nothing in quiet mode", () => {
    testModule.quiet(true);
    const intercept = xstdout.intercept(true);
    testModule.log("test");
    intercept.restore();
    expect(intercept.stdout).to.be.empty;
    expect(intercept.stderr).to.be.empty;
    testModule.quiet(false);
  });
});
