"use strict";
const {
  es6Require,
  scanSubAppsFromDir
  // scanSingleSubAppFromDir
  // getAllSubAppManifest,
  // registerSubApp,
  // getSubAppContainer,
  // loadSubAppByName,
  // loadSubAppServerByName,
  // refreshSubAppByName,
  // refreshAllSubApps
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

    });
  });
});
