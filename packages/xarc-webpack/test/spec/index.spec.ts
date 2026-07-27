/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */
import { expect } from "chai";
import { SubAppWebpackPlugin } from "../../lib/plugins/subapp-plugin-webpack5";

/**
 * Regression tests for CEECORE-7072:
 * webpack >=5.109.0 introduced an AST change where ImportExpression.source.loc
 * can be undefined, crashing SubAppWebpackPlugin.
 */
describe("SubAppWebpackPlugin", () => {
  let plugin: any;

  beforeEach(() => {
    // Pass webpackVersion: 5 to skip findWebpackVersion() filesystem read
    plugin = new SubAppWebpackPlugin({ webpackVersion: 5 });
  });

  describe("findImportCall — webpack >=5.109.0 loc:undefined regression (CEECORE-7072)", () => {
    it("returns import value without throwing when loc is undefined and source is Literal", () => {
      const ast = {
        type: "ImportExpression",
        source: { type: "Literal", value: "./my-subapp", loc: undefined }
      };
      const call = () => plugin.findImportCall(ast, "/app/src/app.tsx");

      expect(call).to.not.throw();
      expect(call()).to.equal("./my-subapp");
    });

    it("returns import value without throwing when loc is defined and source is Literal", () => {
      const ast = {
        type: "ImportExpression",
        source: {
          type: "Literal",
          value: "./my-subapp",
          loc: { start: { line: 5, column: 2 } }
        }
      };
      const call = () => plugin.findImportCall(ast, "/app/src/app.tsx");

      expect(call).to.not.throw();
      expect(call()).to.equal("./my-subapp");
    });

    it("includes line/column in error message when loc is defined and source is non-Literal", () => {
      const ast = {
        type: "ImportExpression",
        source: {
          type: "CallExpression",
          value: undefined,
          loc: { start: { line: 10, column: 5 } }
        }
      };

      let msg = "";
      try {
        plugin.findImportCall(ast, "/app/src/app.tsx");
      } catch (e: any) {
        msg = e.message;
      }

      expect(msg).to.include("10"); // line number
      expect(msg).to.include("6"); // column + 1
      expect(msg).to.include("subapp module import must use literal string");
      expect(msg).to.include("CallExpression");
    });

    it("produces a non-crashing error message when loc is undefined and source is non-Literal", () => {
      // Primary CEECORE-7071 crash path: loc undefined + non-Literal type
      const ast = {
        type: "ImportExpression",
        source: { type: "CallExpression", value: undefined, loc: undefined }
      };

      let msg = "";
      try {
        plugin.findImportCall(ast, "/app/src/app.tsx");
      } catch (e: any) {
        msg = e.message;
      }

      // Must not crash with "Cannot read properties of undefined (reading 'start')"
      expect(msg).to.include("subapp module import must use literal string");
      expect(msg).to.include("CallExpression");
    });
  });
});
