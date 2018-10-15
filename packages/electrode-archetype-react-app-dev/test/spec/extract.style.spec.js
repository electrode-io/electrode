const expect = require("chai").expect;
const archetype = require("electrode-archetype-react-app/config/archetype");
const moduleName = "../../config/webpack/partial/extract-style";

describe("electrode-archetype-react-app-dev extract-styles", function() {
  this.timeout(10000);
  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

  describe("webpack config rules name", () => {
    it("Should enable css modules when cssModuleSupport is true", () => {
      archetype.webpack.cssModuleSupport = true;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0]._name).to.equal("extract-css-modules");
      expect(moduleConfig.rules[1]._name).to.equal("extract-css-scss");
      expect(moduleConfig.rules[2]._name).to.equal("extract-css-stylus");
    });

    it("Should disable css modules when cssModuleSupport is false", () => {
      archetype.webpack.cssModuleSupport = false;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0]._name).to.equal("extract-css");
      expect(moduleConfig.rules[1]._name).to.equal("extract-scss");
      expect(moduleConfig.rules[2]._name).to.equal("extract-stylus");
    });

    it("Should enable both stylus & css modules when cssModuleStylusSupport is true", () => {
      archetype.webpack.cssModuleSupport = false;
      archetype.webpack.cssModuleStylusSupport = true;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0]._name).to.equal("extract-css");
      expect(moduleConfig.rules[1]._name).to.equal("extract-scss");
      expect(moduleConfig.rules[2]._name).to.equal("extract-stylus");
      expect(moduleConfig.rules[3]._name).to.equal("extract-css-stylus");
    });
  });

  describe("enableShortenCSSNames", () => {
    it("Should shorten css names if both cssModuleSupport & enableShortenCSSNames are true", () => {
      process.env.NODE_ENV = "production";
      archetype.webpack.cssModuleSupport = true;
      archetype.webpack.enableShortenCSSNames = true;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0].use[2].options.localIdentName).to.equal("[hash:base64:5]");
      expect(moduleConfig.rules[0].use[3].options.ident).to.equal("postcss");
      delete process.env.NODE_ENV;
    });

    it("Should not shorten css names if cssModuleSupport is false", () => {
      archetype.webpack.cssModuleSupport = false;
      archetype.webpack.enableShortenCSSNames = true;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0].use[2].options.localIdentName).to.be.undefined;
      expect(moduleConfig.rules[0].use[3].options.ident).to.equal("postcss");
    });
  });

  describe("webpack config rules loader", () => {
    it("Should disable sass loader if sassSupport is false", () => {
      archetype.options = {
        sass: false
      };
      archetype.webpack.cssModuleSupport = false;
      const moduleConfig = require(moduleName)().module;
      const hasSass = moduleConfig.rules[1].use.find(x => x.loader.indexOf("sass-loader") > 0);
      expect(hasSass).to.not.exist;
    });

    it("Should enable sass loader if sassSupport is true", () => {
      archetype.options = {
        sass: true
      };
      archetype.webpack.cssModuleSupport = false;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[1].use[4].loader).to.include("sass-loader");
    });
  });
});
