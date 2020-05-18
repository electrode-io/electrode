"use strict";

const expect = require("chai").expect;
const getArchetype = require("../../config/archetype");

describe("config/archetype", function() {
  it("gets the archetype, returns cached on future access", function() {
    const archetype1 = getArchetype();
    expect(archetype1).to.exist;
    expect(archetype1._fromCache).to.be.undefined;
    const archetype2 = getArchetype();
    expect(archetype2._fromCache).to.be.true;
  });
});
