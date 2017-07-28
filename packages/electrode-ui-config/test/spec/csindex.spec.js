"use strict";

const chai = require("chai");
const expect = chai.expect;

describe("clientUiConfig", function () {
  it("should provide ui config for client", function () {
    global.window = {
      _wml: {
        config: {
          ui: {
            basePath: "/test"
          },
          ccm: {
          }
        }
      }
    };

    const uiConfig = require("../../lib/csindex");
    expect(uiConfig.fullPath()).to.equal("/test");
    expect(uiConfig.fullPath("/status")).to.equal("/test/status");
    expect(uiConfig.ui).to.be.ok;
    expect(uiConfig.ccm).to.be.ok;
  });
});
