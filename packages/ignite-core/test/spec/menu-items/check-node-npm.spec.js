"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");
const checkEnv = require("../../../lib/util/check-env");
const checkNodeNpmItem = require("../../../lib/menu-items/check-node-npm");
const logger = require("../../../lib/util/logger");
const Promise = require("bluebird");

describe("menu-item check-node-npm", function() {
  this.timeout(10000);
  it("should create menu item", () => {
    const mi = checkNodeNpmItem();
    expect(mi.emit).to.exist;
    expect(mi.icon).to.exist;
    expect(mi.execute).to.exist;
  });

  it("should check node and npm environment", () => {
    const nodeStub = sinon.stub(checkEnv, "node");
    const npmStub = sinon.stub(checkEnv, "npm");
    const loggerStub = sinon.stub(logger, "log");
    const getNpmVersionStub = sinon
      .stub(checkEnv, "getNpmVersion")
      .returns(Promise.resolve("3.0.0"));

    const mi = checkNodeNpmItem();
    return mi.execute().then(() => {
      mi.emit("post_execute");

      return Promise.delay(30).then(() => {
        nodeStub.restore();
        npmStub.restore();
        loggerStub.restore();
        getNpmVersionStub.restore();
        expect(nodeStub).to.have.been.calledOnce;
        expect(npmStub).to.have.been.calledOnce;
        expect(npmStub.args).to.deep.equal([["3.0.0"]]);
        expect(loggerStub).to.have.been.calledOnce;
      });
    });
  });
});
