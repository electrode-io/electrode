"use strict";
const {
  es6Require,
  scanSubAppsFromDir,
  scanSingleSubAppFromDir,
  getAllSubAppManifest,
  registerSubApp,
  getSubAppContainer,
  loadSubAppByName,
  loadSubAppServerByName,
  refreshSubAppByName,
  refreshAllSubApps
} = require("../../lib");
const Path = require("path");
const Fs = require("fs");

describe("subapp-util", function() {
  describe("es6Require", () => {
    it("should import module", () => {
      const fs = es6Require("fs");
      expect(fs).to.equal(Fs);
    });
  });

  describe("scanSubAppsFromDir", () => {
    it("should get subapps in src dir if subapp-manifest.js exists", () => {
      const path = Path.resolve("test/data/subapp1/src");
      const subapp = scanSubAppsFromDir(path);
      expect(subapp.subapp1).to.exist;
    });
    it("should get subapps in src dir if subapp-manifest.js does not exist", () => {
      const path = Path.resolve("test/data/subapp2/src");
      const subapp = scanSubAppsFromDir(path);
      expect(Fs.existsSync(Path.resolve("test/data/subapp2/src/entry"))).be.true;
      expect(subapp.Entry).to.exist;
    });
  });

  describe("scanSingleSubAppFromDir", () => {
    it("should get single sub app", () => {
      const path = Path.resolve("test/data/subapp1/src");
      const subapp = scanSingleSubAppFromDir(path);
      expect(subapp).to.exist;
      expect(subapp.name).to.equal("subapp1");
    });
    it("should return null if dir does not exist", () => {
      const path = Path.resolve("test/data/subapp1/src1");
      const subapp = scanSingleSubAppFromDir(path);
      expect(subapp).to.not.exist;
    });
  });

  describe("getAllSubAppManifest", () => {
    after(() => {
      if (process.env.APP_SRC_DIR) delete process.env.APP_SRC_DIR;
    });
    it("should get all sub apps manifest files", () => {
      process.env.APP_SRC_DIR = "test/data";
      const subapp = getAllSubAppManifest();
      expect(subapp).to.exist;
      expect(
        Object.keys(subapp)
          .sort()
          .join()
      ).to.equal("Entry,subapp1");
    });
  });

  describe("registerSubApp", () => {
    let registeredSubapp;
    it("should register subapp", () => {
      const path = Path.resolve("test/data/subapp1/src");
      const subapp = scanSingleSubAppFromDir(path);
      registeredSubapp = registerSubApp(subapp);
      expect(registeredSubapp.name).to.equal("subapp1");
    });
    it("should fail to register a subapp that has been registered", () => {
      const registerAgain = () => registerSubApp(registeredSubapp);
      expect(registerAgain).to.throw;
    });
  });

  describe("getSubAppContainer", () => {
    let symbol;
    before(() => {
      symbol = Symbol.for("Electrode SubApps Container");
      if (global[symbol]) delete global[symbol];
    });
    afterEach(() => {
      if (global[symbol]) delete global[symbol];
    });
    it("should get subapp container if `global[SUBAPP_CONTAINER_SYM]` exists", () => {
      global[symbol] = { "my-app": { name: "my-app" } };
      const container = getSubAppContainer();
      expect(container).to.exist;
      expect(container["my-app"].name).to.equal("my-app");
    });
    it("should get empty object if `global[SUBAPP_CONTAINER_SYM]` does not exist", () => {
      const container = getSubAppContainer();
      expect(container).to.be.empty;
    });
  });

  describe("loadSubAppByName", () => {
    after(() => {
      delete process.env.APP_SRC_DIR;
    });
    it("should load subapp by name", () => {
      process.env.APP_SRC_DIR = "test/data";
      const subapp = loadSubAppByName("subapp1");
      expect(subapp.name).to.equal("subapp1");
    });
  });

  describe("loadSubAppServerByName", () => {
    before(() => {
      process.env.APP_SRC_DIR = "test/data";
    });
    after(() => {
      delete process.env.APP_SRC_DIR;
    });
    it("should load subapp server by name", () => {
      const server = loadSubAppServerByName("subapp1");
      expect(server.name).to.equal("subapp1-server");
    });
    it("should return empty object if no `serverEntry` given in subapp", () => {
      const server = loadSubAppServerByName("Entry");
      expect(server).be.empty;
    });
  });

  describe("refreshSubAppByName", () => {
    before(() => {
      process.env.APP_SRC_DIR = "test/data";
    });
    after(() => {
      delete process.env.APP_SRC_DIR;
    });
    it("should refresh subapp by name", () => {
      const path = Path.resolve(process.env.APP_SRC_DIR, "subapp1/src/index.js");
      delete require.cache[path];
      refreshSubAppByName("subapp1");
      const serverEntry = Path.resolve(process.env.APP_SRC_DIR, "subapp1/src/server.js");
      expect(require.cache[serverEntry]).to.not.exist;
    });
  });

  describe("refreshAllSubApps", () => {
    const symbol = Symbol.for("Electrode SubApps Container");
    before(() => {
      process.env.APP_SRC_DIR = "test/data";
      global[symbol] = { subapp1: {} };
    });
    after(() => {
      delete process.env.APP_SRC_DIR;
      delete global[symbol];
    });
    it("should refresh all subapps", () => {
      const path = Path.resolve(process.env.APP_SRC_DIR, "subapp1/src/index.js");
      delete require.cache[path];
      refreshAllSubApps();
      const serverEntry = Path.resolve(process.env.APP_SRC_DIR, "subapp1/src/server.js");
      expect(require.cache[serverEntry]).to.not.exist;
    });
  });
});
