"use strict";

const Path = require("path");
const Fs = require("fs");

const { loadAssetsFromStats, getChunksById } = require("../../lib/util");

describe("loadAssetsFromStats", () => {
  it("should load assets", () => {
    const assets = loadAssetsFromStats("./test/data/prod-stats.json");
    expect(assets).be.not.empty;
  });

  it("should load assets without manifest if no such asset exists", () => {
    const assets = loadAssetsFromStats("./test/data/prod-stats-no-manifest.json");
    expect(assets).be.not.empty;
    expect(assets).to.not.have.own.property("manifest");
  });

  it("should return empty assets if stats.json does not exist", () => {
    const assets = loadAssetsFromStats("some path");
    expect(assets).be.empty;
  });
});

describe("getChunksById", function() {
  const prodStats = JSON.parse(Fs.readFileSync(Path.join(__dirname, "../data/prod-stats.json")));
  const devStats = JSON.parse(Fs.readFileSync(Path.join(__dirname, "../data/dev-stats.json")));

  it("should handle production stats", () => {
    const result = getChunksById(prodStats);

    expect(result).to.have.property("_names_");
    expect(result).to.have.property("js");
    expect(result).to.have.property("map");
    expect(result.js).contains("mainbody.bundle.js");
    expect(result.map).contains("../map/mainbody.bundle.js.map");
  });

  it("should handle development stats", () => {
    const result = getChunksById(devStats);

    expect(result).to.not.have.property("_names_");
    expect(result).to.have.property("js");
    expect(result).to.not.have.property("map");
    expect(result.js).to.have.property("mainbody");
  });
});
