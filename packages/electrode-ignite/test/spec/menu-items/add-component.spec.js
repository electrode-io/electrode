"use strict";

const addComponentItem = require("../../../lib/menu-items/add-component");
const expect = require("chai").expect;

describe("menu-item add-component", function() {
  it("should be ok", () => {
    expect(addComponentItem).to.exist;
    const mi = addComponentItem();
    expect(mi.cliCmd).to.equal("add-component");
    expect(mi.menuText).to.equal("Add a React component to your electrode component repo");
  });
});
