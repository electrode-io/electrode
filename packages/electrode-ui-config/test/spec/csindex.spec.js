"use strict";

const chai = require("chai");
const expect = chai.expect;

describe("clientUiConfig", function() {
  const csindex = "../../dist/csindex";
  it("should provide ui config for client", function() {
    global.window = {
      _config: {
        ui: {
          basePath: "/test"
        }
      }
    };

    delete require.cache[require.resolve(csindex)];
    const uiConfig = require(csindex);
    expect(uiConfig.fullPath()).to.equal("/test");
    expect(uiConfig.fullPath("/status")).to.equal("/test/status");
    expect(uiConfig.ui).to.be.ok;
  });

  it("should provide empty ui without window._config", function() {
    global.window = {};
    delete require.cache[require.resolve(csindex)];
    const uiConfig = require(csindex);
    expect(uiConfig.ui).to.be.an("object").that.is.empty;
  });
});
