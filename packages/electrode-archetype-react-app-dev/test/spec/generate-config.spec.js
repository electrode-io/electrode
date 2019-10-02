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
    it("If the configFilename and webpack.config.js exist, prioritize the configFilename", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const defaultFilename = "webpack.config.js";

      const configWebpackPath = Path.join(process.cwd(), configFilename);
      const configWebpackContents = {test: 1};
      mockRequire(configWebpackPath, configWebpackContents);

      const defaultWebpackPath = Path.join(process.cwd(), defaultFilename);
      const defaultWebpackContents = {test: 2};
      mockRequire(defaultWebpackPath, defaultWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
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
      mockRequire.stop(defaultWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If only the root webpack.config.js and arch/configFilename exist, prioritize the webpack.config", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const defaultFilename = "webpack.config.js";

      const configWebpackPath = Path.join(process.cwd(), configFilename);
      mockRequire(configWebpackPath, undefined);

      const defaultWebpackPath = Path.join(process.cwd(), defaultFilename);
      const defaultWebpackContents = {test: 2};
      mockRequire(defaultWebpackPath, defaultWebpackContents);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
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

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(defaultWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If only the arch/configFilename exists, use that config", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const defaultFilename = "webpack.config.js";

      const configWebpackPath = Path.join(process.cwd(), configFilename);
      mockRequire(configWebpackPath, undefined);

      const defaultWebpackPath = Path.join(process.cwd(), defaultFilename);
      mockRequire(defaultWebpackPath, undefined);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      const archWebpackContents = {test: 3};
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
      mockRequire.stop(defaultWebpackPath);
      mockRequire.stop(archWebpackPath);
    });

    it("If none of the configs are available, return an empty config", () => {
      const { generateConfig } = require(moduleName);
      const configFilename = "production.js";
      const defaultFilename = "webpack.config.js";

      const configWebpackPath = Path.join(process.cwd(), configFilename);
      mockRequire(configWebpackPath, undefined);

      const defaultWebpackPath = Path.join(process.cwd(), defaultFilename);
      mockRequire(defaultWebpackPath, undefined);

      const archWebpackPath = Path.join(Path.resolve("archetype/config/webpack"), configFilename);
      mockRequire(archWebpackPath, undefined);

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

      mockRequire.stop(configWebpackPath);
      mockRequire.stop(defaultWebpackPath);
      mockRequire.stop(archWebpackPath);
    });
  });
});
