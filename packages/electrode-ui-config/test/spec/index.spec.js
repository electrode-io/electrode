"use strict";

process.env.NODE_CONFIG_DIR = "test/config/default";

const chai = require("chai");
const expect = chai.expect;
const uiConfig = require("../../lib");

describe("config", function() {
  beforeEach(() => {
    uiConfig.config = {
      ui: {
        basePath: "/test"
      }
    };
  });

  it("should have ui", () => {
    expect(uiConfig.ui).to.be.ok;
    expect(uiConfig.ui.basePath).to.equal("/test");
  });

  describe("fullPath", function() {
    it("should return '/test' for undefined or empty ''", () => {
      expect(uiConfig.fullPath()).to.equal("/test");
      expect(uiConfig.fullPath("")).to.equal("/test");
    });
  });
});
