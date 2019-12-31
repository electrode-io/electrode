"use strict";

const startToken = require("../../lib/start");

describe("start", function() {
  it("should return subapp start HTML", () => {
    expect(startToken().process()).contains("subapp start");
  });
});
