const expect = require("chai").expect;
const archetype = require("electrode-archetype-react-app/config/archetype");
const moduleName = "../../config/webpack/partial/extract-style";

describe("electrode-archetype-react-app-dev extract-styles", () => {
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
      expect(moduleConfig.rules[0].loader[2].loader).to.include("[hash:base64:5]");
      delete process.env.NODE_ENV;
    });

    it("Should not shorten css names if cssModuleSupport is false", () => {
      archetype.webpack.cssModuleSupport = false;
      archetype.webpack.enableShortenCSSNames = true;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0].loader[2].loader).to.not.include("[hash:base64:5]");
    });
  });

  describe("webpack config rules loader", () => {
    it("Should enable cssnext if cssModuleSupport is true", () => {
      archetype.webpack.cssModuleSupport = true;
      const moduleConfig = require(moduleName)().plugins;
      const webpackLoaderOptions = moduleConfig[2].options.options;
      expect(webpackLoaderOptions.postcss()).to.be.an("array").that.is.not.empty;
      expect(webpackLoaderOptions.stylus.use).to.be.an("array").that.is.empty;
    });

    it("Should enable stylus autoprefixer if cssModuleSupport is false", () => {
      archetype.webpack.cssModuleSupport = false;
      const moduleConfig = require(moduleName)().plugins;
      const webpackLoaderOptions = moduleConfig[2].options.options;
      expect(webpackLoaderOptions.postcss()).to.be.an("array").that.is.empty;
      expect(webpackLoaderOptions.stylus.use).to.be.an("array").that.is.not.empty;
    });

    it("Should disable sass loader if sassSupport is false", () => {
      archetype.options = {
        sass: false
      };
      archetype.webpack.cssModuleSupport = false;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[1].use[4].loader).to.not.include("sass-loader");
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
