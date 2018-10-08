"use stritct";

const Path = require("path");
const content = require("../../../lib/react/content");

describe("content", function() {
  let saveEnv;
  const cwd = process.cwd();

  before(() => {
    saveEnv = process.env.NODE_ENV;
  });

  after(() => {
    if (saveEnv !== undefined) {
      process.env.NODE_ENV = saveEnv;
    } else {
      delete process.env.NODE_ENV;
    }
  });

  afterEach(() => {
    process.chdir(cwd);
  });

  describe("loadElectrodeDllAssets", function() {
    it("should return empty if unable to load asset data", () => {
      expect(content.loadElectrodeDllAssets()).to.deep.equal({});
      expect(content.loadElectrodeDllAssets({})).to.deep.equal({});
      expect(content.loadElectrodeDllAssets({ electrodeDllAssetsPath: "blahblah" })).to.deep.equal(
        {}
      );
    });

    it("should return load and return asset data", () => {
      expect(
        content.loadElectrodeDllAssets({ electrodeDllAssetsPath: "test/data/test-dll-assets.json" })
      ).to.deep.equal({ foo: { bar: [1] } });
    });

    it("should load default asset data for dev mode", () => {
      process.env.NODE_ENV = "";
      process.chdir(Path.join(__dirname, "../../data"));
      expect(content.loadElectrodeDllAssets({})).to.deep.equal({ production: false });
    });

    it("should load default asset data for prod mode", () => {
      process.env.NODE_ENV = "production";
      process.chdir(Path.join(__dirname, "../../data"));
      expect(content.loadElectrodeDllAssets({})).to.deep.equal({ production: true });
    });
  });

  describe("makeElectrodeDllScripts", function() {
    it("should return empty string for empty asset", () => {
      expect(content.makeElectrodeDllScripts({})).to.equal("");
    });

    it("should return scripts for DLL asset in cdnMapping", () => {
      const script = content.makeElectrodeDllScripts({
        foo: {
          cdnMapping: {
            a: "test-a.js",
            b: "test-b.js"
          }
        }
      });

      console.log(script);
      expect(script).to.equal(`<script src="test-a.js"></script>
<script src="test-b.js"></script>`);
    });
  });
});
