"use strict";

const util = require("../../lib/util");
const Path = require("path");

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

  it("getExtractor should get chunk extractor if stats file exists", () => {
    const extractor = util.getExtractor(Path.resolve("./test/loadable-stats.json"));
    expect(Object.keys(extractor).length > 1);
  });
});
