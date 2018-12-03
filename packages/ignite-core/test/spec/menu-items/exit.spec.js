"use strict";

const exitItem = require("../../../lib/menu-items/exit");
const expect = require("chai").expect;

describe("menu-item exit", function() {
  this.timeout(10000);
  it("should create menu item", () => {
    const mi = exitItem();
    expect(mi.emit).to.exist;
    expect(mi.menuText).to.equal("Exit");
    expect(mi.icon).to.exist;
    expect(mi.execute).to.exist;
    let event;
    mi.execute({ menu: { emit: evt => (event = evt) } });
    expect(event).to.equal("exit");
  });
});
