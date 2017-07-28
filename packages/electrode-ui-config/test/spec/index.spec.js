"use strict";

process.env.NODE_CONFIG_DIR = "test/config/default";

const chai = require("chai");
const expect = chai.expect;
const _ = require("lodash");
const uiConfig = require("../../lib");

describe("config", function () {
  let req;

  beforeEach(() => {
    req = {};
    uiConfig._server = {
      app: {
        config: {
          ui: {
            basePath: "/test"
          }
        }
      }
    };
    _.set(req, "app.ccm._store.test", "12345");
  });

  it("should have ui", () => {
    expect(uiConfig.ui).to.be.ok;
    expect(uiConfig.ui.basePath).to.equal("/test");
  });

  it("should throw error if uiConfig.ccm accessed", () => {
    expect(() => { return uiConfig.ccm;}).to.throw();
  });

  describe("fullPath", function () {
    it("should return '/test' for undefined or empty ''", () => {
      expect(uiConfig.fullPath()).to.equal("/test");
      expect(uiConfig.fullPath("")).to.equal("/test");
    });
  });

  it("should have ccm", () => {
    expect(uiConfig.getCcm(req)).to.be.ok;
  });
});

