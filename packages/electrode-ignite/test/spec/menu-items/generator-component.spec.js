"use strict";

const generatorComponentItem = require("../../../lib/menu-items/generator-component");
const expect = require("chai").expect;

describe("menu-item generator-component", function() {
  it("should be ok", () => {
    expect(generatorComponentItem).to.exist;
    expect(generatorComponentItem).to.exist;
    const mi = generatorComponentItem();
    expect(mi.cliCmd).to.equal("generate-component");
    expect(mi.menuText).to.equal("Generate an Electrode component repo");
  });
});
