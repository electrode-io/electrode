"use strict";

const ssrFramework = require("../../lib");

describe("SSR React framework", function() {
  it("should setup React framework", () => {
    expect(ssrFramework.React).to.be.ok;
    expect(ssrFramework.AppContext).to.be.ok;
    expect(ssrFramework.loadSubApp).to.be.a("function");
  });
});
