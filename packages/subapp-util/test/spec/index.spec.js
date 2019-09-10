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
const sinon = require("sinon");

describe("subapp-util", function() {
  describe("es6Require", () => {
    it("should import module", () => {
      const fs = es6Require("fs");
      expect(fs).to.equal(Fs);
    });
  });

  describe("scanSubAppsFromDir", () => {
    let message = [];
    let stubScanDir;
    let stubConsoleError;
    let stubProcessExit;

    afterEach(() => {
      message = [];
      if (stubScanDir) stubScanDir.restore();
      if (stubConsoleError) stubConsoleError.restore();
      if (stubProcessExit) stubProcessExit.restore();
    });

    it("should get subapps in src dir if subapp-manifest.js exists", () => {
      const path = Path.resolve("test/data/subapp1/src");
      const subapp = scanSubAppsFromDir(path);
      expect(subapp.subapp1).to.exist;
    });

    it("should get subapp with name empty string if subapp info file does not have correct extension", () => {
      stubScanDir = sinon
        .stub(require("filter-scan-dir"), "sync")
        .callsFake(() => ({ maniFiles: [], files: ["subapp-conf"] }));
      const path = Path.resolve("test/data/subapp2/src");
      const subapp = scanSubAppsFromDir(path);
      expect(subapp).to.have.property("");
    });

    it("should fail loading subapps if manifest file path does not exist", () => {
      stubScanDir = sinon
        .stub(require("filter-scan-dir"), "sync")
        .callsFake(() => ({ maniFiles: ["subapp-non-exist.js"] }));
      stubConsoleError = sinon.stub(console, "error").callsFake(s => message.push(s));
      stubProcessExit = sinon.stub(process, "exit").callsFake(() => "do nothing");
      const path = Path.resolve("test/data/subapp1/src");
      scanSubAppsFromDir(path);
      expect(message[0]).to.equal("Loading SubApps failed");
    });

    it("should get subapps in src dir if subapp-manifest.js does not exist", () => {
      const path = Path.resolve("test/data/subapp2/src");
      const subapp = scanSubAppsFromDir(path);
      expect(Fs.existsSync(Path.resolve("test/data/subapp2/src/entry"))).be.true;
      expect(subapp.Entry).to.exist;
    });

    it("should not add subapp to subApps object if the subapp has already exist", () => {
      stubScanDir = sinon.stub(require("filter-scan-dir"), "sync").callsFake(() => ({
        maniFiles: ["subapp-conf.js"],
        files: ["subapp2/subapp1/subapp-entry.js"]
      }));
      stubConsoleError = sinon.stub(console, "error").callsFake(s => message.push(s));
      stubProcessExit = sinon.stub(process, "exit").callsFake(() => "do nothing");
      const path = Path.resolve("test/data/subapp1/src");
      const subapp = scanSubAppsFromDir(path);
      expect(Object.keys(subapp).length).to.equal(1);
      expect(subapp).to.have.property("Subapp1");
    });

    it("should fail loading subapps if files path does not exist", () => {
      stubScanDir = sinon.stub(require("filter-scan-dir"), "sync");
      stubScanDir.onCall(0).returns({
        maniFiles: [],
        files: ["Entry"]
      });
      stubScanDir.onCall(1).throws();
      stubConsoleError = sinon.stub(console, "error").callsFake(s => message.push(s));
      stubProcessExit = sinon.stub(process, "exit").callsFake(() => "do nothing");
      const path = Path.resolve("test/data/subapp2/src");
      scanSubAppsFromDir(path);
      expect(message[0]).to.equal("Loading SubApps failed");
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
      expect(Object.keys(subapp).length).to.equal(4);
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

    it("should replace the subapp if registered again", () => {
      let message;
      const stubConsoleError = sinon.stub(console, "error").callsFake(s => (message = s));
      registerSubApp(registeredSubapp);
      expect(registeredSubapp.name).to.equal("subapp1");
      expect(message).to.equal(
        `registerSubApp: subapp '${registeredSubapp.name}' already registered - replacing`
      );
      stubConsoleError.restore();
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

    it("should load subapp without registering if subapp has already in container", () => {
      const symbol = Symbol.for("Electrode SubApps Container");
      global[symbol] = { subapp1: { name: "subapp1", entry: "UNKNOWN" } };
      process.env.APP_SRC_DIR = "test/data";
      const subapp = loadSubAppByName("subapp1");
      expect(subapp.name).to.equal("subapp1");
      expect(subapp.entry).to.equal("UNKNOWN");
      delete global[symbol];
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

    it("should generate `serverEntry` given in subapp", () => {
      const server = loadSubAppServerByName("Entry");
      expect(server).to.have.property("StartComponent");
    });

    it("should return empty `serverEntry` if subapp manifest sets serverEntry to false", () => {
      const server = loadSubAppServerByName("Entry");
      expect(server).to.have.property("StartComponent");
    });

    it("should not load subapp server by name if NODE_ENV = production but lib does not exist", () => {
      delete process.env.APP_SRC_DIR;
      process.env.NODE_ENV = "production";
      expect(() => loadSubAppServerByName("subapp1")).to.throw();
      delete process.env.NODE_ENV;
    });

    it.skip("should not load subapp server by name if NODE_ENV = production and appMode.subApps exists but no serverEntry in it", () => {
      process.env.NODE_ENV = "production";
      delete process.env.APP_SRC_DIR;
      Object.keys(require.cache).forEach(key => delete require.cache[key]);
      const manifest = Path.resolve("test/data/.prod/.app-mode.json");
      const fake = sinon.stub(Path, "resolve");
      Path.resolve.withArgs(".prod/.app-mode.json").callsFake(() => manifest);
      Path.resolve.callThrough();
      const subapp = require("../../lib").loadSubAppServerByName("subapp1");
      expect(subapp).be.empty;
      delete process.env.NODE_ENV;
      fake.restore();
    });

    it("should not load subapp server by name if NODE_ENV !== production and src does not exist", () => {
      delete process.env.APP_SRC_DIR;
      expect(() => loadSubAppServerByName("subapp1")).to.throw();
    });
  });

  describe("refreshSubAppByName", () => {
    let serverEntry;
    let entryFullPath;

    before(() => {
      process.env.APP_SRC_DIR = "test/data";
      serverEntry = Path.resolve(process.env.APP_SRC_DIR, "subapp1/src/server.js");
      entryFullPath = Path.resolve(process.env.APP_SRC_DIR, "subapp1/src/index.js");
      if (require.cache[serverEntry]) delete require.cache[serverEntry];
      if (require.cache[entryFullPath]) delete require.cache[entryFullPath];
    });

    after(() => {
      delete process.env.APP_SRC_DIR;
    });

    afterEach(() => {
      if (require.cache[serverEntry]) delete require.cache[serverEntry];
      if (require.cache[entryFullPath]) delete require.cache[entryFullPath];
    });

    it("should refresh subapp by name", () => {
      require(serverEntry);
      refreshSubAppByName("subapp1");
      expect(require.cache[serverEntry]).to.not.exist;
    });

    it("should not reload server side module if entryFullPath in require.cache", () => {
      require(entryFullPath);
      require(serverEntry);
      refreshSubAppByName("subapp1");
      expect(require.cache[serverEntry]).to.exist;
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
