"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");
const xsh = require("xsh");
const logger = require("../../../lib/logger");
const installation = rewire("../../../tasks/installation");

describe("inite-core:installation", function() {
  let xshStub = "";
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
    xshStub = sinon.stub(xsh, "exec");
    xshStub
      .withArgs(true, "npm ls -g -j --depth=0 xclap-cli")
      .returns(Promise.resolve({ stdout: "1.0.0\n" }));
    xshStub
      .withArgs(true, "npm show xclap-cli version")
      .returns(Promise.resolve({ stdout: "1.0.0\n" }));
    xshStub
      .withArgs("npm install -g xclap-cli")
      .returns(Promise.resolve({ stdout: "xclap-cli@1.0.0\n" }));
  });

  afterEach(function() {
    xshStub.restore();
    loggerStub.restore();
  });

  it("check local xclap-cli dependency", function(done) {
    const checkLocalXClapCLI = installation.__get__("checkLocalXClapCLI");
    checkLocalXClapCLI().then(function() {
      sinon.assert.callCount(xshStub, 1);
      assert.equal(
        xshStub.getCalls()[0].args.toString(),
        "true,npm ls -g -j --depth=0 xclap-cli"
      );
      done();
    });
  });

  it("check latest xclap-cli version", function(done) {
    const checkXClapCLILatestVersion = installation.__get__(
      "checkXClapCLILatestVersion"
    );
    checkXClapCLILatestVersion().then(function() {
      sinon.assert.callCount(xshStub, 1);
      assert.equal(
        xshStub.getCalls()[0].args.toString(),
        "true,npm show xclap-cli version"
      );
      done();
    });
  });
});
