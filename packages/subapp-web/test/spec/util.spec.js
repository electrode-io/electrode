"use strict";

const { loadAssetsFromStats } = require("../../lib/util");

describe("loadAssetsFromStats", () => {
  it("should load assets", () => {
    const assets = loadAssetsFromStats("./test/data/stats.json");
    expect(assets).be.not.empty;
  });

  it("should load assets without manifest if no such asset exists", () => {
    const assets = loadAssetsFromStats("./test/data/stats-no-manifest.json");
    expect(assets).be.not.empty;
    expect(assets).to.not.have.own.property("manifest");
  });

  it("should return empty assets if stats.json does not exist", () => {
    const assets = loadAssetsFromStats("some path");
    expect(assets).be.empty;
  });
});
