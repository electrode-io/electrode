"use strict";

const expect = require("chai").expect;
require("sinon");
const fs = require("fs");
const mockRequire = require("mock-require");
const Path = require("path");

const moduleName = "../../lib/features";
const eTmpDir = ".testetmp";

// https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
const deleteFolderRecursive = function(path) {
  if (!fs.existsSync(path)) return;
  fs.readdirSync(path).forEach((file) => {
    const curPath = Path.resolve(path, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      deleteFolderRecursive(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(path);
};

describe("features", function() {
  before(() => {
    mockRequire("../../config/archetype", {
      devRequire: require,
      eTmpDir
    });
  });

  beforeEach(() => {
    deleteFolderRecursive(eTmpDir);
    fs.mkdirSync(eTmpDir);
  });

  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
    const cwd = process.env.PWD || process.cwd();
    mockRequire.stop(`${cwd}/package.json`);
  });

  function mockArchetypeOptions(options) {
    mockRequire("../../config/archetype", {
      devRequire: require,
      eTmpDir,
      options
    });
  }

  function mockApplicationPackageJson(contents) {
    const cwd = process.env.PWD || process.cwd();
    mockRequire(`${cwd}/package.json`, contents);
  }

  function mockFeaturePackageJson(packageName, contents) {
    mockRequire(`${packageName}/package.json`, contents);
  }

  function mockFeatureNpmPackageJson(packageName, contents) {
    function request(url, options, callback) {
      callback(undefined, undefined, {
        "dist-tags": {
          "latest": "fakeVersion"
        },
        "versions": {
          "fakeVersion": contents
        }
      });
    }
    mockRequire("request", request);
  }

  it("should return false for enabled if feature is not listed as dependency in package.json", function() {
    const packageName = "electrode-archetype-opt-react";
    const packageJson = { dependencies: {}, devDependencies: {} };
    mockApplicationPackageJson(packageJson);
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    expect(feature.enabled).to.equal(false);
  });

  it("should return true for enabled if feature is listed as dependency in package.json", function() {
    const packageName = "electrode-archetype-opt-react";
    const packageVersion = "1.0.1";
    const packageJson = { dependencies: {}, devDependencies: {} };
    packageJson.dependencies[packageName] = `^${packageVersion}`;
    mockApplicationPackageJson(packageJson);
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    expect(feature.enabled).to.equal(true);
  });

  it("should return true for enabled if feature is listed as dev dependency in package.json", function() {
    const packageName = "electrode-archetype-opt-react";
    const packageVersion = "1.0.1";
    const packageJson = { dependencies: {}, devDependencies: {} };
    packageJson.devDependencies[packageName] = `^${packageVersion}`;
    mockApplicationPackageJson(packageJson);
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    expect(feature.enabled).to.equal(true);
  });

  it("should return the feature's package.json 'version' attribute for installed version", function() {
    const packageName = "electrode-archetype-opt-react";
    const packageVersion = "1.0.1";
    mockFeaturePackageJson(packageName, { version: packageVersion });
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    expect(feature.installedVersion).to.equal(packageVersion);
  });

  it("should return the npm latest version when 'npmVersion' is requested", function() {
    const packageName = "electrode-archetype-opt-react";
    const packageVersion = "1.0.1";
    const npmVersion = "1.0.6";
    mockFeaturePackageJson(packageName, { version: packageVersion });
    mockFeatureNpmPackageJson(packageName, { version: npmVersion });
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    feature.attachNpmAttributes().then(() => {
      expect(feature.npmVersion).to.equal(npmVersion);
    });
  });

  it("should return the npm latest version and description when 'npmVersion' and 'npmDescription' are requested", function() {
    const packageName = "electrode-archetype-opt-react";
    const packageVersion = "1.0.1";
    const npmDescription = "Some description";
    const npmVersion = "1.0.6";
    mockFeaturePackageJson(packageName, { version: packageVersion });
    mockFeatureNpmPackageJson(packageName, { description: npmDescription, version: npmVersion });
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    feature.attachNpmAttributes().then(() => {
      expect(feature.npmDescription).to.equal(npmDescription);
      expect(feature.npmVersion).to.equal(npmVersion);
    });
  });

  it("should return true for 'enabledLegacy' if the archetype has the optionalTagName", async function() {
    const packageName = "electrode-archetype-opt-react";
    const optionalTagName = "someTagName";
    const packageVersion = "1.0.1";
    mockApplicationPackageJson({});
    mockFeaturePackageJson(packageName, {
      version: packageVersion,
      electrodeOptArchetype: {
        defaultInstall: false,
        expectTag: true,
        optionalTagName
      }
    });
    mockArchetypeOptions({ someTagName: true });
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    await feature.attachNpmAttributes();
    expect(feature.enabledLegacy).to.equal(true);
  });

  it("should return true for 'enabledLegacy' if defaultInstall is true and archetype does not have optionalTagName", async function() {
    const packageName = "electrode-archetype-opt-react";
    const optionalTagName = "someTagName";
    const packageVersion = "1.0.1";
    mockApplicationPackageJson({});
    mockFeaturePackageJson(packageName, {
      version: packageVersion,
      electrodeOptArchetype: {
        defaultInstall: true,
        expectTag: true,
        optionalTagName
      }
    });
    mockArchetypeOptions({});
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    await feature.attachNpmAttributes();
    expect(feature.enabledLegacy).to.equal(true);
  });

  it("should return false for 'enabledLegacy' if defaultInstall is true and archetype forceably disables optionalTagName", async function() {
    const packageName = "electrode-archetype-opt-react";
    const optionalTagName = "someTagName";
    const packageVersion = "1.0.1";
    mockApplicationPackageJson({});
    mockFeaturePackageJson(packageName, {
      version: packageVersion,
      electrodeOptArchetype: {
        defaultInstall: true,
        expectTag: true,
        optionalTagName
      }
    });
    mockArchetypeOptions({ someTagName: false });
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    await feature.attachNpmAttributes();
    expect(feature.enabledLegacy).to.equal(false);
  });

  it("should return false for 'enabledLegacy' if defaultInstall is false and archetype does not set optionalTagName", async function() {
    const packageName = "electrode-archetype-opt-react";
    const optionalTagName = "someTagName";
    const packageVersion = "1.0.1";
    mockApplicationPackageJson({});
    mockFeaturePackageJson(packageName, {
      version: packageVersion,
      electrodeOptArchetype: {
        defaultInstall: false,
        expectTag: true,
        optionalTagName
      }
    });
    mockArchetypeOptions({});
    const { Feature } = require(moduleName);
    const feature = new Feature(packageName);
    await feature.attachNpmAttributes();
    expect(feature.enabledLegacy).to.equal(false);
  });
});
