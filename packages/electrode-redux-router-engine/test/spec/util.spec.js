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

  it("createdStatExtractor should get default chunk extractor if stats file does not exists", () => {
    const extractor = util.createdStatExtractor();
    expect(Object.keys(extractor).length > 1);
  });

  it("createdStatExtractor should get chunk extractor if stats file exists", () => {
    const path = Path.resolve("test/loadable-stats.json");
    const stubbed = sinon.stub(Path, "resolve", () => path);
    const extractor = util.createdStatExtractor();
    expect(Object.keys(extractor).length > 1);
    stubbed.restore();
  });

  it("getTargetByQuery should get default target from request query string", () => {
    const target = util.getTargetByQuery({});
    expect(target).to.equal("default");
  });

  it("getTargetByQuery should get target if query __dist refer to existing target bundle", () => {
    const stubbed = sinon.stub(require("fs"), "existsSync", () => true);
    const target = util.getTargetByQuery({__dist: "es6"});
    expect(target).to.equal("es6");
    stubbed.restore();
  });
});
