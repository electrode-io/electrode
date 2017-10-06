"use strict";

const checkEnv = require("../../../lib/util/check-env");
const expect = require("chai").expect;

// TODO: add more tests

describe("check-env", function() {
  it("getNpmVersion should get NPM version", () => {
    return checkEnv.getNpmVersion().then(version => {
      expect(version).to.be.not.empty;
    });
  });
});
