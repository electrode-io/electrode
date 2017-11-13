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

    it("electrode should work for node >= 6.0.0.", () => {
      logs = [];
      checkEnv.node("6.0.0");
      expect(logs[0]).includes("You are using Node version 6.0.0. Electrode should work for you.");
    });

    it("electrode should not work for node < 6.0.0.", () => {
      logs = [];
      checkEnv.node("5.0.0");
      expect(logs[0]).includes(
        "You are using Node version 5.0.0. We recommend use Node LTS version 6."
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

    it("electrode should work for npm >= 3.0.0.", () => {
      logs = [];
      checkEnv.npm("3.0.0");
      expect(logs[0]).includes("You are using npm version 3.0.0. Electrode should work for you.");
    });

    it("should prompt a hint message with npm version v5.4.x", () => {
      logs = [];
      checkEnv.npm("5.4.2");
      expect(logs[0]).includes("Note: Please avoid npm version v5.4.x, it may cause an incorrect installation while using electrode ignite.");
    });

    it("electrode should not work for node < 3.0.0.", () => {
      logs = [];
      checkEnv.npm("2.0.0");
      expect(logs[0]).includes(
        "You are using npm version 2.0.0. Electrode requires npm version 3 and up."
      );
    });
  });
});
