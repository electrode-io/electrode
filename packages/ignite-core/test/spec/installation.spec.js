"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");
const xsh = require("xsh");
const installation = rewire("../../tasks/installation");

describe("inite-core:installation", function() {
  let xshStub = "";

  beforeEach(function() {
    xshStub = sinon.stub(xsh, "exec");
    xshStub
      .withArgs(true, "npm ls -g -j --depth=0 xclap-cli")
      .returns(Promise.resolve({ stdout: "1.0.0\n" }));
    xshStub
      .withArgs(true, "npm show xclap-cli version")
      .returns(Promise.resolve({ stdout: "1.0.0\n" }));
  });

  afterEach(function() {
    xshStub.restore();
  });

  it("check xclap-cli dependency", function(done) {
    const checkXClapCLI = installation.__get__("checkXClapCLI");
    checkXClapCLI().then(function() {
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
