/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore, no-invalid-this, @typescript-eslint/class-name-casing */
/* eslint-disable no-unused-expressions, max-nested-callbacks, no-unused-expressions */

import { getDevOptions } from "../../src/config/archetype";
const moduleName = "@xarc/webpack/lib/partials/extract-style";

import { describe, it, afterEach } from "mocha";
import { expect } from "chai";

const archetype = getDevOptions();

// TODO: should move to xarc-webpack
describe.skip("@xarc/app-dev extract-styles", function() {
  this.timeout(10000);

  archetype.options.sass = true;

  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

  describe("webpack config rules name", () => {
    it("Should enable css modules when cssModuleSupport is true", () => {
      archetype.webpack.cssModuleSupport = true;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0]._name).to.equal("extract-css-modules");
      expect(moduleConfig.rules[1]._name).to.equal("extract-css-modules-scss");
      expect(moduleConfig.rules[2]._name).to.equal("extract-css-modules-stylus");
    });

    it("Should disable css modules when cssModuleSupport is false", () => {
      archetype.webpack.cssModuleSupport = false;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0]._name).to.equal("extract-css");
      expect(moduleConfig.rules[1]._name).to.equal("extract-css-scss");
      expect(moduleConfig.rules[2]._name).to.equal("extract-css-stylus");
    });
  });

  describe("enableShortenCSSNames", () => {
    it("Should shorten css names if both cssModuleSupport & enableShortenCSSNames are true", () => {
      process.env.NODE_ENV = "production";
      archetype.webpack.cssModuleSupport = true;
      archetype.webpack.enableShortenCSSNames = true;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0].use[1].options.localIdentName).to.equal("[hash:base64:5]");
      expect(moduleConfig.rules[0].use[2].options.ident).to.equal("postcss");
      delete process.env.NODE_ENV;
    });

    it("Should not shorten css names if cssModuleSupport is false", () => {
      archetype.webpack.cssModuleSupport = false;
      archetype.webpack.enableShortenCSSNames = true;
      const moduleConfig = require(moduleName)().module;
      expect(moduleConfig.rules[0].use[1].options.localIdentName).to.be.undefined;
      expect(moduleConfig.rules[0].use[2].options.ident).to.equal("postcss");
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
      expect(moduleConfig.rules[1].use[3].loader).to.include("sass-loader");
    });
  });
});
