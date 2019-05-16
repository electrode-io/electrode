"use strict";

const {
  resolveChunkSelector,
  loadAssetsFromStats,
  getIconStats,
  getCriticalCSS,
  getStatsPath,
  resolvePath,
  setupSubAppHapiRoutes
} = require("../../lib/utils");
const Path = require("path");
const Hapi = require("hapi");
const sinon = require("sinon");
const { ReactWebapp } = require("electrode-react-webapp");
// const Promise = require("bluebird");
// const request = Promise.promisify(require("request"));

describe("subapp-server", () => {
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
      const criticalCss = getCriticalCSS("./test/data/critical-css.json");
      expect(JSON.parse(criticalCss).name).to.equal("critical-css");
    });

    it("should return empty string if criticalCss file does not exist", () => {
      expect(getCriticalCSS()).to.equal("");
    });
  });

  describe("getStatsPath", () => {
    after(() => {
      delete process.env.WEBPACK_DEV;
    });

    it("should get stats.json path in dev mode", () => {
      process.env.WEBPACK_DEV = "true";
      const path = getStatsPath("", ".build");
      expect(path).to.satisfy(s => s.endsWith(".build/stats.json"));
    });

    it("should get stats.json path in prod mode", () => {
      process.env.WEBPACK_DEV = "";
      const path = getStatsPath("./stats.json");
      expect(path).to.equal("./stats.json");
    });
  });

  describe("resolvePath", () => {
    it("should resolve path if it is not absolute path", () => {
      const path = resolvePath("./a/b");
      expect(path).to.equal(Path.resolve("./a/b"));
    });

    it("should return path if it is absolute path", () => {
      expect("/a/b").to.equal(resolvePath("/a/b"));
    });
  });

  describe("setupSubAppHapiRoutes", () => {
    let server;
    let stubPathResolve;
    let stubRouteHandler;
    const stubWithArgs = (lib, method, argsFakeCallPairs) => {
      const stubbed = sinon.stub(lib, method);
      argsFakeCallPairs.forEach(([args, fakeCall]) =>
        lib[method].withArgs(...args).callsFake(fakeCall)
      );
      lib[method].callThrough();
      return stubbed;
    };

    const getStubResolve1 = () => {
      const serverRoutesPath = Path.resolve("./test/data/server-routes");
      return stubWithArgs(Path, "resolve", [
        [["src", "server-routes"], () => serverRoutesPath],
        [["lib", "server-routes"], () => serverRoutesPath]
      ]);
    };

    const getStubResolve2 = () => {
      const serverRoutesPath = Path.resolve("./test/data/server-routes/file1");
      return stubWithArgs(Path, "resolve", [
        [["src", "server-routes"], () => serverRoutesPath],
        [["lib", "server-routes"], () => serverRoutesPath]
      ]);
    };

    beforeEach(() => {
      server = new Hapi.Server();
      server.connection({ port: 8081 });
    });

    afterEach(() => {
      server.stop();
      if (stubPathResolve) stubPathResolve.restore();
      if (stubRouteHandler) stubRouteHandler.restore();
    });

    it("should setup subapp routes with `htmlFile` specified in options", async () => {
      stubPathResolve = getStubResolve1();
      await setupSubAppHapiRoutes(server, {
        htmlFile: "index.html"
      });
      await server.start();
      const { result } = await server.inject({
        method: "GET",
        url: "/file1"
      });
      expect(result).to.equal("<body><h1>hello world</h1></body>");
    });

    it.only("TBD", async () => {
      stubPathResolve = getStubResolve1();
      stubRouteHandler = sinon
        .stub(ReactWebapp, "makeRouteHandler")
        .callsFake(() => async () => {
          return {
            result: {
              status: 301,
              path: "/file1"
            }
          };
        });
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const res = await server.inject({
        method: "GET",
        url: "/file2"
      });
      console.log(res.result);
      // expect(res.result).to.equal("<html>file2.html</html>");
    });

    it("should setup subapp routes with `favicon=false` in options", async () => {
      stubPathResolve = getStubResolve2();
      await setupSubAppHapiRoutes(server, {
        favicon: false
      });
      await server.start();
      const { result } = await server.inject({
        method: "GET",
        url: "/file1"
      });
      expect(result).to.equal("<body><h1>hello world</h1></body>");
    });
  });
});
