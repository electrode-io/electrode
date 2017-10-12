"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");
const checkEnv = require("../../../lib/util/check-env");
const checkNodeNpmItem = require("../../../lib/menu-items/check-node-npm");
const logger = require("../../../lib/util/logger");

describe("menu-item check-node-npm", function() {
  it("should create menu item", () => {
    const mi = checkNodeNpmItem();
    expect(mi.emit).to.exist;
    expect(mi.icon).to.exist;
    expect(mi.execute).to.exist;
  });

  it("should check node and npm environment", done => {
    const nodeStub = sinon.stub(checkEnv, "node");
    const npmStub = sinon.stub(checkEnv, "npm");
    const loggerStub = sinon.stub(logger, "log");

    const mi = checkNodeNpmItem();
    mi.emit("post_execute");

    setTimeout(() => {
      nodeStub.restore();
      npmStub.restore();
      loggerStub.restore();
      expect(nodeStub).to.have.been.calledOnce;
      expect(npmStub).to.have.been.calledOnce;
      expect(loggerStub).to.have.been.calledOnce;
      done();
    }, 30);
  });
});
