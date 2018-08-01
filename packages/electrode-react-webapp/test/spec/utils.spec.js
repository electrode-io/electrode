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

  describe("htmlifyError", function() {
    let save;
    beforeEach(() => {
      if (process.env.hasOwnProperty("NODE_ENV")) {
        save = process.env.NODE_ENV;
      }
    });

    afterEach(() => {
      delete process.env.NODE_ENV;
      if (save !== undefined) {
        process.env.NODE_ENV = save;
        save = undefined;
      }
    });

    it("should return doc with err.html and err.stack", () => {
      const err = new Error("test1");
      err.html = "foo bar";
      const r = utils.htmlifyError(err);
      expect(r).contains("foo bar");
      expect(r).contains("/test/spec/utils.spec.js");
    });

    it("should return err.message if err.stack is not avail somehow", () => {
      const err = { message: "hello world" };
      const r = utils.htmlifyError(err);
      expect(r).contains("hello world");
    });

    it("should return doc w/o err.stack in production", () => {
      const err = new Error("test1");
      err.html = "foo bar";
      process.env.NODE_ENV = "production";
      const r = utils.htmlifyError(err);
      expect(r).contains("foo bar");
      expect(r).to.not.contains("/test/spec/utils.spec.js");
    });

    it("should return doc w/o err.stack if withStack is false", () => {
      const err = new Error("test1");
      err.html = "foo bar";
      process.env.NODE_ENV = "development";
      const r = utils.htmlifyError(err, false);
      expect(r).contains("foo bar");
      expect(r).to.not.contains("/test/spec/utils.spec.js");
    });
  });
});
