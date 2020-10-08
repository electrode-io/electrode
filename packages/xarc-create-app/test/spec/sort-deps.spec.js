const sortDeps = require("../../src/sort-deps");
const { expect } = require("chai");

describe("sort-deps", function () {
  it("skip undefined sections", async () => {
    const pkg = {
      dependencies: { a: 1, b: 1 }
    };
    sortDeps(pkg);
    const sortedDeps = pkg.dependencies;
    const sortedStr = Object.keys(sortedDeps).sort().join("");
    expect(sortedStr.trim()).to.equal("ab");
  });
});
