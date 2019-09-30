"use strict";

const { resolveChunkSelector, getIconStats, getCriticalCSS } = require("../../lib/utils");

describe("subapp-server utils", () => {
  describe("resolveChunkSelector", () => {
    it("should return specified chunk selector if the chunk selector file exists", () => {
      const selector = resolveChunkSelector({ bundleChunkSelector: "./test/data/selector" });
      expect(selector).to.be.a("function");
      const { js, css } = selector();
      expect(js).to.equal("app");
      expect(css).to.equal("app");
    });

    it("should return default chunk selector if the bundleChunkSelector does not exists", () => {
      const selector = resolveChunkSelector({});
      expect(selector).to.be.a("function");
      const { js, css } = selector();
      expect(js).to.equal("main");
      expect(css).to.equal("main");
    });
  });

  describe("getIconStats", () => {
    it("should load iconStats", () => {
      const html = ["icons-123.png", "icons-123/manifest.json", "icons-123/manifest.webapp"];
      const iconStats = getIconStats("./test/data/iconstats.json");
      expect(iconStats).to.equal(html.join(""));
    });

    it("should load iconStats as object if html field not exists", () => {
      const iconStats = getIconStats("./test/data/iconstats-no-html.json");
      expect(iconStats).to.be.an("object");
      expect(Object.keys(iconStats).length).to.equal(1);
    });

    it("should return empty string if iconstats.json does not exist", () => {
      expect(getIconStats("some path")).to.equal("");
    });

    it("should return empty string if iconstats file cannot be parsed as js object", () => {
      expect(getIconStats("./test/data/selector")).to.equal("");
    });
  });

  describe("getCriticalCSS", () => {
    it("should get criticalCss", () => {
      const criticalCss = getCriticalCSS("./test/data/critical.css");
      expect(criticalCss).to.include("h1");
    });

    it("should return empty string if criticalCss file does not exist", () => {
      expect(getCriticalCSS()).to.equal("");
    });
  });
});
