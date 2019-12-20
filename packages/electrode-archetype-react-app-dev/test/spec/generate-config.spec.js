const mockRequire = require("mock-require");
const expect = require("chai").expect;
const Path = require("path");

const moduleName = "../../config/webpack/util/generate-config";

describe("generate-config", function() {
  this.timeout(10000);

  before(() => {
  });

  beforeEach(() => {
  });

  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

  after(() => {
  });

  describe("generateConfig", () => {
    it("If the configFilename is development.js and only webpack.config.development.js exists, fall back to archetype webpack", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "webpack.config.dev.js";
      const defaultFilename = "webpack.config.development.js";

      const defaultWebpackPath = Path.join(process.cwd(), defaultFilename);
      const defaultWebpackContents = {test: 1};
      mockRequire(defaultWebpackPath, defaultWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 2};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename: "development.js"
      }, true);

      expect(config).to.deep.equal(archWebpackContents);

      mockRequire.stop(defaultWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configFilename is development.js and only webpack.config.dev.js exists, use webpack.config.dev.js", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "development.js";
      const defaultFilename = "webpack.config.dev.js";

      const defaultWebpackPath = Path.join(process.cwd(), defaultFilename);
      const defaultWebpackContents = {test: 3};
      mockRequire(defaultWebpackPath, defaultWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 4};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(defaultWebpackContents);

      mockRequire.stop(defaultWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is coverage.js and only coverage.js exists, fall back to archetype webpack", () => {
      const { generateConfig } = require(moduleName);
      const defaultFilename = "coverage.js";
      const configFilename = "webpack.config.coverage.js";

      const configWebpackPath = Path.join(process.cwd(), defaultFilename);
      const configWebpackContents = {test: 5};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 6};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename: "coverage.js"
      }, true);

      expect(config).to.deep.equal(archWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is coverage.js and only webpack.config.coverage.js exists, use webpack.config.coverage.js", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "coverage.js";
      const defaultFilename = "webpack.config.coverage.js";

      const configWebpackPath = Path.join(process.cwd(), defaultFilename);
      const configWebpackContents = {test: 7};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 8};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(configWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is production.js and only production.js exists, fall back to archetype webpack", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const archFilename = "webpack.config.js";

      const configWebpackPath = Path.join(process.cwd(), configFilename);
      const configWebpackContents = {test: 9};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), archFilename);
      const archWebpackContents = {test: 10};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(archWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is production.js and only webpack.config.production.js exists, fall back to archetype webpack", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const archFilename = "webpack.config.js";
      const defaultFilename = "webpack.config.production.js";

      const configWebpackPath = Path.join(process.cwd(), defaultFilename);
      const configWebpackContents = {test: 11};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), archFilename);
      const archWebpackContents = {test: 12};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(archWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If the configName is production.js and only webpack.config.js exists, use webpack.config.js", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const defaultFilename = "webpack.config.js";

      const configWebpackPath = Path.join(process.cwd(), defaultFilename);
      const configWebpackContents = {test: 13};
      mockRequire(configWebpackPath, configWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 14};
      mockRequire(archWebpackPath, archWebpackContents);

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal(configWebpackContents);

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If none of the configs are available, return an empty config", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";

      const config = generateConfig({
        profiles: {
          _base: {
            partials: {}
          },
          _production: {
            partials: {}
          }
        },
        profileNames: [ "_base", "_production" ],
        configFilename
      }, true);

      expect(config).to.deep.equal({});
    });
  });
});
