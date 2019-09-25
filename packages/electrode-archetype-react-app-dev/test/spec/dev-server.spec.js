const expect = require("chai").expect;
const mockRequire = require("mock-require");

const moduleName = "../../lib/dev-admin/dev-server";
const electrodeServerModuleName = "electrode-server";
const inert16ModuleName = "inert";
const inert18ModuleName = "@hapi/inert";

describe("dev-server", function() {
  this.timeout(10000);

  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

  describe("config", () => {
    it("if @hapi/inert is available include inert with module attribute", () => {
      const electrodeServer = (config) => {
        expect(config).to.have.any.keys("plugins");
        expect(config.plugins).to.have.any.keys("inert");
        expect(config.plugins.inert).to.have.any.keys("module");
        expect(config.plugins.inert.module).to.equal("@hapi/inert");
      };
      mockRequire(electrodeServerModuleName, electrodeServer);
      mockRequire(inert16ModuleName, false);
      mockRequire(inert18ModuleName, true);
      require(moduleName);
    });

    it("if @hapi/inert is not available but inert is, include inert with no module attribute", () => {
      const electrodeServer = (config) => {
        expect(config).to.have.any.keys("plugins");
        expect(config.plugins).to.have.any.keys("inert");
        expect(config.plugins.inert).not.to.have.any.keys("module");
      };
      mockRequire(electrodeServerModuleName, electrodeServer);
      mockRequire(inert16ModuleName, true);
      mockRequire(inert18ModuleName, false);
      require(moduleName);
    });

    it("if both @hapi/inert and inert are available include inert with module attribute", () => {
      const electrodeServer = (config) => {
        expect(config).to.have.any.keys("plugins");
        expect(config.plugins).to.have.any.keys("inert");
        expect(config.plugins.inert).to.have.any.keys("module");
        expect(config.plugins.inert.module).to.equal("@hapi/inert");
      };
      mockRequire(electrodeServerModuleName, electrodeServer);
      mockRequire(inert16ModuleName, true);
      mockRequire(inert18ModuleName, true);
      require(moduleName);
    });

    it("if neither @hapi/inert nor inert are available then plugins should not contain inert", () => {
      const electrodeServer = (config) => {
        expect(config).to.have.any.keys("plugins");
        expect(config.plugins).not.to.have.any.keys("inert");
      };
      mockRequire(electrodeServerModuleName, electrodeServer);
      mockRequire(inert16ModuleName, false);
      mockRequire(inert18ModuleName, false);
      require(moduleName);
    });
  });
});
