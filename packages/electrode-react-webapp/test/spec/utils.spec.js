"use strict";

const expect = require("chai").expect;
const utils = require("../../lib/utils");
const Path = require("path");

describe("utils", function() {
  it("getIconStats should return stats w/o html as is", () => {
    const x = utils.getIconStats("test/data/icon-stats-empty.json");
    expect(x).to.deep.equal({ empty: true });
  });

  it("getStatsPath should return diff path with webpack dev", () => {
    const x = utils.getStatsPath("dist/stats.json", "build");
    expect(x).to.equal("dist/stats.json");
    process.env.WEBPACK_DEV = "true";
    const x2 = utils.getStatsPath("dist/stats.json", "build");
    expect(x2).to.equal(Path.resolve("build", "stats.json"));
    delete process.env.WEBPACK_DEV;
  });
});
