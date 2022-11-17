"use strict";

const loadHandler = require("../../lib/load-handler");

describe("token module load handler", function() {
  it("should handle ES6 module default", () => {
    const x = loadHandler("../fixtures/token-mod-es6-default", __dirname);
    expect(x.toString()).contains("function es6Default");
  });

  it("should handle module exporting tokenHandler", () => {
    const x = loadHandler("../fixtures/token-mod-handler", __dirname);
    expect(x.toString()).contains("function asTokenHandler");
  });

  it("should handle module with invalid export", () => {
    expect(() => loadHandler("../fixtures/token-mod-invalid", __dirname)).throw(
      "token module invalid"
    );
  });
});
