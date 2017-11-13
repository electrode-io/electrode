"use strict";

const MenuItem = require("../../../lib/menu-item");
const expect = require("chai").expect;

describe("menu-item", function() {
  it("should create menu item as an emitter", () => {
    const mi = new MenuItem({
      icon: "1",
      menuText: "test",
      execute: "test"
    });
    expect(mi.emit).to.exist;
  });
});
