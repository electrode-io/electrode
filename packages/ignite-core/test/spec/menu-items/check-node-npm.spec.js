"use strict";

const checkNodeNpmItem = require("../../../lib/menu-items/check-node-npm");
const expect = require("chai").expect;

// TODO: add more tests

describe("menu-item check-node-npm", function() {
  it("should create menu item", () => {
    const mi = checkNodeNpmItem();
    expect(mi.emit).to.exist;
    expect(mi.icon).to.exist;
    expect(mi.execute).to.exist;
  });
});
