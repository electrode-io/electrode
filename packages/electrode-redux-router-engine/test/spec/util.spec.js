"use strict";

const util = require("../../lib/util");
const Path = require("path");
const sinon = require("sinon");

describe("util", function() {
  it("es6Default should return default", () => {
    expect(util.es6Default({ default: "hello" })).to.equal("hello");
  });

  it("es6Default should return mod if no default", () => {
    expect(util.es6Default({ foo: "hello" })).to.have.key("foo");
  });

  it("resolveModulePath should resolve leading . paths", () => {
    expect(util.resolveModulePath("./test")).to.equal(Path.resolve("test"));
  });

  it("resolveModulePath should not resolve paths w/o leading .", () => {
    expect(util.resolveModulePath("test")).to.equal("test");
  });

  it("getExtractor should get default chunk extractor if stats file does not exists", () => {
    const extractor = util.getExtractor();
    expect(Object.keys(extractor).length > 1);
  });

  it("getExtractor should get chunk extractor if stats file exists", () => {
    Object.keys(require.cache).forEach(key => delete require.cache[key]);
    const stubExists = sinon.stub(require("fs"), "existsSync", () => true);
    const path = Path.resolve("./test/loadable-stats.json");
    const stubResolve = sinon.stub(Path, "resolve", () => path);
    const extractor = util.getExtractor();
    expect(Object.keys(extractor).length > 1);
    stubExists.restore();
    stubResolve.restore();
  });

  it("getExtractor should get same chunk extractor if NODE_env = production", () => {
    process.env.NODE_ENV = "production";
    const extractor1 = util.getExtractor(Path.resolve("./test/loadable-stats.json"));
    const extractor2 = util.getExtractor(Path.resolve("./test/loadable-stats.json"));
    expect(extractor1).to.equal(extractor2);
    delete process.env.NODE_ENV;
  });
});
