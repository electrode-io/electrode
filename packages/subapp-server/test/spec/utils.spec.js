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
const electrodeServer = require("electrode-server");
const sinon = require("sinon");
const { ReactWebapp } = require("electrode-react-webapp");

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
      const criticalCss = getCriticalCSS("./test/data/critical.css");
      expect(criticalCss).to.include("h1");
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
      const faviconPath = Path.resolve("test/data/favicon.ico");
      return stubWithArgs(Path, "resolve", [
        [
          ["src", "server-routes"],
          () => {
            return serverRoutesPath;
          }
        ],
        [
          ["lib", "server-routes"],
          () => {
            return serverRoutesPath;
          }
        ],
        [
          ["static/favicon.ico"],
          () => {
            return faviconPath;
          }
        ]
      ]);
    };

    const getStubResolve3 = () => {
      const serverRoutesPath = Path.resolve("./test/data/file3");
      return stubWithArgs(Path, "resolve", [
        [["src", "server-routes"], () => serverRoutesPath],
        [["lib", "server-routes"], () => serverRoutesPath]
      ]);
    };

    beforeEach(async () => {
      server = await electrodeServer({
        connection: {
          port: 8081
        },
        electrode: {
          logLevel: "none"
        }
      });
    });

    afterEach(async () => {
      await server.stop();
      if (stubPathResolve) stubPathResolve.restore();
      if (stubRouteHandler) stubRouteHandler.restore();
    });

    it("should setup subapp routes with `templateFile` specified in options", async () => {
      process.env.NODE_ENV = "production";
      stubPathResolve = getStubResolve1();
      await setupSubAppHapiRoutes(server, {
        templateFile: "index-hello.jsx",
        devServer: { https: true }
      });
      await server.start();
      const { result } = await server.inject({
        method: "GET",
        url: "/file1"
      });
      expect(result).to.equal(`<body><h1>hello world
</h1>
</body>
`);
      delete process.env.NODE_ENV;
    });

    it("should setup subapp routes with `favicon=false` in options", async () => {
      stubPathResolve = getStubResolve2();
      await setupSubAppHapiRoutes(server, {
        favicon: false
      });
      await server.start();
      const { result } = await server.inject({
        method: "GET",
        url: "/favicon.ico"
      });
      expect(result.statusCode).to.equal(404);
      expect(result.error).to.equal("Not Found");
    });

    it("should let the server redirect if status code = 301", async () => {
      stubPathResolve = getStubResolve1();
      stubRouteHandler = sinon.stub(ReactWebapp, "makeRouteHandler").callsFake(() => async () => {
        return {
          result: {
            status: 301,
            path: "/file1"
          }
        };
      });
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const { statusCode, result } = await server.inject({
        method: "GET",
        url: "/file2"
      });
      expect(result).to.equal("");
      expect(statusCode).to.equal(302);
    });

    it("should let the server reply html if status code = 404", async () => {
      stubPathResolve = getStubResolve1();
      stubRouteHandler = sinon.stub(ReactWebapp, "makeRouteHandler").callsFake(() => async () => {
        return {
          result: {
            status: 404,
            path: "/file1",
            html: "<h1>Not Found</h1>"
          }
        };
      });
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const { result, statusCode } = await server.inject({
        method: "GET",
        url: "/file2"
      });
      expect(result).to.equal("<h1>Not Found</h1>");
      expect(statusCode).to.equal(404);
    });

    it("should let the server reply data object if status code = 404 and no html set", async () => {
      stubPathResolve = getStubResolve1();
      stubRouteHandler = sinon.stub(ReactWebapp, "makeRouteHandler").callsFake(() => async () => {
        return {
          result: {
            status: 404,
            path: "/file1"
          }
        };
      });
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const { result, statusCode } = await server.inject({
        method: "GET",
        url: "/file2"
      });
      expect(result.path).to.equal("/file1");
      expect(statusCode).to.equal(404);
    });

    it("should let the server reply html if status code = 200", async () => {
      stubPathResolve = getStubResolve1();
      stubRouteHandler = sinon.stub(ReactWebapp, "makeRouteHandler").callsFake(() => async () => {
        return {
          result: {
            status: 200,
            path: "/file1",
            html: "<h1>hello</h1>"
          }
        };
      });
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const { result, statusCode } = await server.inject({
        method: "GET",
        url: "/file2"
      });
      expect(result).to.equal("<h1>hello</h1>");
      expect(statusCode).to.equal(200);
    });

    it("should let the server reply data object if status code = 200 and no html set", async () => {
      stubPathResolve = getStubResolve1();
      stubRouteHandler = sinon.stub(ReactWebapp, "makeRouteHandler").callsFake(() => async () => {
        return {
          result: {
            status: 200,
            path: "/file1"
          }
        };
      });
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const { result, statusCode } = await server.inject({
        method: "GET",
        url: "/file2"
      });
      expect(result.path).to.equal("/file1");
      expect(statusCode).to.equal(200);
    });

    it("should let the server reply data object if status code is 505", async () => {
      stubPathResolve = getStubResolve1();
      stubRouteHandler = sinon.stub(ReactWebapp, "makeRouteHandler").callsFake(() => async () => {
        return {
          result: {
            status: 505,
            path: "/file1",
            html: "<h1>hello</h1>"
          }
        };
      });
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const { result } = await server.inject({
        method: "GET",
        url: "/file2"
      });
      expect(result.path).to.equal("/file1");
      expect(result.status).to.equal(505);
    });

    it("should let the server reply error stack if routeHandler throw an error", async () => {
      stubPathResolve = getStubResolve1();
      stubRouteHandler = sinon.stub(ReactWebapp, "makeRouteHandler").callsFake(() => async () => {
        throw new Error();
      });
      const logs = [];
      const stubConsoleError = sinon.stub(console, "error").callsFake(c => logs.push(c));
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      await server.inject({
        method: "GET",
        url: "/file2"
      });
      expect(logs[0]).to.equal("Route file2 failed:");
      stubConsoleError.restore();
      process.env.NODE_ENV = "production";
      const { result } = await server.inject({
        method: "GET",
        url: "/file2"
      });
      expect(result.statusCode).to.equal(500);
      delete process.env.NODE_ENV;
    });

    it("should throw error if route.htmlFile not defined", async () => {
      stubPathResolve = getStubResolve3();
      try {
        await setupSubAppHapiRoutes(server, {});
      } catch (e) {
        expect(e.code).to.equal("ERR_ASSERTION");
      }
    });

    it("should let server reply favicon if icon retrieved", async () => {
      stubPathResolve = getStubResolve2();
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const { statusCode } = await server.inject({
        method: "GET",
        url: "/favicon.ico"
      });
      expect(statusCode).to.equal(200);
    });

    it("should let server reply 404 if icon not retrieved", async () => {
      stubPathResolve = getStubResolve1();
      await setupSubAppHapiRoutes(server, {});
      await server.start();
      const { statusCode } = await server.inject({
        method: "GET",
        url: "/favicon.ico"
      });
      expect(statusCode).to.equal(404);
    });
  });
});
