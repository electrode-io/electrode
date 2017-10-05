"use strict";

const generatorAppItem = require("../../../lib/menu-items/generator-app");
const expect = require("chai").expect;

describe("menu-item generator-app", function() {
  it("should be ok", () => {
    expect(generatorAppItem).to.exist;
    const mi = generatorAppItem();
    expect(mi.cliCmd).to.equal("generate-app");
    expect(mi.menuText).to.equal("Generate an Electrode application");
  });
});
