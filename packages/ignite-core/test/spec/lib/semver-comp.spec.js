"use strict";

const assert = require("assert");
const semverComp = require("../../../lib/semver-comp");

describe("ignite-core: semver-comp", function() {
  it("when version a < version b", function() {
    assert.equal(semverComp("0.0.1", "1.0.0"), -1);
  });

  it("when version a === version b", function() {
    assert.equal(semverComp("1.0.0", "1.0.0"), 0);
  });

  it("when version a > version b", function() {
    assert.equal(semverComp("1.0.1", "1.0.0"), 1);
  });

  it("when version a is not valid", function() {
    assert.equal(semverComp("invalid", "1.0.0"), -1);
  });

  it("when version b is not valid", function() {
    assert.equal(semverComp("1.0.0", "invalid"), 1);
  });
});
