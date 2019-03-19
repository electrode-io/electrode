"use strict";

const expect = require("chai").expect;
const Fs = require("fs");
const utils = require("../../lib/utils");
const Path = require("path");
const sinon = require("sinon");

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

  describe("invokeTemplateProcessor", () => {
    it("should execute templateProcessor function directly", () => {
      let resA;
      let resB;
      const templateProcessor = (a, b) => {
        resA = a;
        resB = b;
      };

      const asyncTemplate = {};
      const options = { templateProcessor };

      utils.invokeTemplateProcessor(asyncTemplate, options);
      expect(resA).to.equal(asyncTemplate);
      expect(resB).to.equal(options);
    });

    it("should throw if templateProcessor is not a function", () => {
      const asyncTemplate = {};
      const options = { templateProcessor: true };

      expect(() => utils.invokeTemplateProcessor(asyncTemplate, options)).to.throw(
        "is not a function"
      );
    });

    it("should load function exported from module", () => {
      const asyncTemplate = {};
      const options = { templateProcessor: "./test/fixtures/template-processor-1" };

      expect(utils.invokeTemplateProcessor(asyncTemplate, options)).to.equal(
        "template-processor-1"
      );
    });

    it("should load defined function exported from module", () => {
      const asyncTemplate = {};
      const options = { templateProcessor: "./test/fixtures/template-processor-2" };

      expect(utils.invokeTemplateProcessor(asyncTemplate, options)).to.equal(
        "template-processor-2"
      );
    });

    it("should throw if module doesn't export usable function", () => {
      const asyncTemplate = {};
      const options = { templateProcessor: "./test/fixtures/template-processor-3" };

      expect(() => utils.invokeTemplateProcessor(asyncTemplate, options)).to.throw(
        "doesn't export a usable function"
      );
    });
  });

  describe("getOtherStats", () => {
    it("should require stats file if dist/server exists", () => {
      const fakeExistsSync = sinon.stub(Fs, "existsSync").callsFake(() => true);
      const fakeReaddirSync = sinon
        .stub(Fs, "readdirSync")
        .callsFake(() => [Path.resolve("es5-stats.json"), Path.resolve("es6-stats.json")]);
      const otherStats = utils.getOtherStats();
      fakeExistsSync.restore();
      fakeReaddirSync.restore();
      const keys = Object.keys(otherStats);
      expect(keys.includes("es5")).be.true;
      expect(keys.includes("es6")).be.true;
    });
  });

  describe("getOtherAssets", () => {
    it("should generate otherAssets if otherStats is not empty", () => {
      const otherStats = {
        es5: Path.resolve("es5-stats.json"),
        es6: Path.resolve("es6-stats.json")
      };
      const buildArtifacts = ".build";
      const pluginOptions = { otherStats, buildArtifacts };
      const otherAssets = utils.getOtherAssets(pluginOptions, utils.loadAssetsFromStats);
      const keys = Object.keys(otherAssets);
      expect(keys.includes("es5")).be.true;
      expect(keys.includes("es6")).be.true;
    });
  });

  describe("getBundleJsNameByQuery", () => {
    it("should get file name ends with main.bundle.js", () => {
      const data = {
        jsChunk: { name: "bundle" }
      };
      const otherAssets = {
        es6: { js: [{ name: "es6.main.bundle.js" }] }
      };
      const es6 = utils.getBundleJsNameByQuery(
        Object.assign(data, {
          query: { __dist: "es6" }
        }),
        otherAssets
      );
      expect(es6).to.equal(otherAssets.es6.js[0].name);
      const es5 = utils.getBundleJsNameByQuery(
        Object.assign(data, {
          query: { __dist: "es5" }
        }),
        otherAssets
      );
      expect(es5).to.equal(data.jsChunk.name);
      const branch = utils.getBundleJsNameByQuery(
        Object.assign(data, {
          query: { __dist: "es6" }
        }),
        Object.assign(otherAssets, {
          es6: { js: [{ name: "main.js" }] }
        })
      );
      expect(branch).to.equal(data.jsChunk.name);
    });
  });
});
