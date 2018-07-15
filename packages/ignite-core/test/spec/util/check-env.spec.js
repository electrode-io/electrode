"use strict";

const checkEnv = require("../../../lib/util/check-env");
const expect = require("chai").expect;
const logger = require("../../../lib/util/logger");
const sinon = require("sinon");

describe("check-env", function() {
  it("getNpmVersion should get NPM version", () => {
    return checkEnv.getNpmVersion().then(version => {
      expect(version).to.be.not.empty;
    });
  });

  describe("node version requirements for electrode", () => {
    let logs = [];
    let logStub;
    beforeEach(() => {
      logStub = sinon.stub(logger, "log").callsFake(msg => logs.push(msg));
    });
    afterEach(() => {
      logStub.restore();
    });

    it("electrode should work for node >= 8.0.0.", () => {
      logs = [];
      checkEnv.node("8.0.0");
      expect(logs[0]).includes("You are using Node version 8.0.0. Electrode should work for you.");
    });

    it("electrode should not work for node < 8.0.0.", () => {
      logs = [];
      checkEnv.node("6.0.0");
      expect(logs[0]).includes(
        "You are using Node version 6.0.0. Electrode uses async/await and requires Node LTS version 8 or later."
      );
    });
  });

  describe("npm version requirements for electrode", () => {
    let logs = [];
    let logStub;
    beforeEach(() => {
      logStub = sinon.stub(logger, "log").callsFake(msg => logs.push(msg));
    });
    afterEach(() => {
      logStub.restore();
    });

    it("electrode should work for npm >= 5.6.0.", () => {
      logs = [];
      checkEnv.npm("5.6.0");
      expect(logs[0]).includes("You are using npm version 5.6.0. Electrode should work for you.");
    });

    it("electrode should not work for npm < 5.6.0.", () => {
      logs = [];
      checkEnv.npm("5.0.0");
      expect(logs[0]).includes(
        "You are using npm version 5.0.0. Electrode requires npm version 5.6.0 or later."
      );
    });
  });
});
