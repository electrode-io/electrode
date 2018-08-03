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

  describe("getCspNonce", () => {
    it("should get no CSP nonce if option is not defined", () => {
      const nonce = utils.getCspNonce(
        {
          app: {
            scriptCsp: "csp-script",
            styleCsp: "csp-style"
          }
        },
        null
      );
      expect(nonce).to.deep.equal({
        scriptNonce: ``,
        styleNonce: ``
      });
    });

    it("should call function with request to get CSP nonce", () => {
      const nonce = utils.getCspNonce({}, (request, tag) => {
        if (tag === "script") return "csp-script";
        if (tag === "style") return "csp-style";
        return "";
      });
      expect(nonce).to.deep.equal({
        scriptNonce: ` nonce="csp-script"`,
        styleNonce: ` nonce="csp-style"`
      });
    });

    it("should get CSP nonce from request base on option path", () => {
      const nonce = utils.getCspNonce(
        {
          app: {
            scriptCsp: "csp-script",
            styleCsp: "csp-style"
          }
        },
        {
          script: "app.scriptCsp",
          style: "app.styleCsp"
        }
      );
      expect(nonce).to.deep.equal({
        scriptNonce: ` nonce="csp-script"`,
        styleNonce: ` nonce="csp-style"`
      });
    });

    it("should get no CSP nonce if no value can be retrieved", () => {
      const nonce = utils.getCspNonce(
        {
          app: {}
        },
        {
          script: "app.scriptCsp",
          style: "app.styleCsp"
        }
      );
      expect(nonce).to.deep.equal({
        scriptNonce: ``,
        styleNonce: ``
      });
    });
  });

  describe("getCriticalCSS", () => {
    it("should return empty string if loading failed", () => {
      const x = utils.getCriticalCSS("blah");
      expect(x).to.equal("");
    });

    it("should load CSS from a file", () => {
      const x = utils.getCriticalCSS("test/data/critical.css");
      expect(x).to.equal(`body {color: green;}
`);
    });
  });

  describe("processRenderSsMode", () => {
    it("should return false for renderSs option being false", () => {
      expect(utils.processRenderSsMode({}, false, "")).to.equal(false);
    });

    it("should return false for renderSs mode being noss", () => {
      expect(utils.processRenderSsMode({}, true, "noss")).to.equal(false);
    });

    it("should return datass for renderSs and set ssrPrefetchOnly flat in request", () => {
      const request = {};
      expect(utils.processRenderSsMode(request, "datass", "")).to.equal("datass");
      expect(request.app.ssrPrefetchOnly).to.equal(true);
    });

    it("should return datass for mode and set ssrPrefetchOnly flat in request", () => {
      const request = {};
      expect(utils.processRenderSsMode(request, true, "datass")).to.equal("datass");
      expect(request.app.ssrPrefetchOnly).to.equal(true);
    });
  });
});
