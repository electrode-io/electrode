import {
  RenderContext,
  TokenModule,
  loadTokenModuleHandler,
  TOKEN_HANDLER,
  TEMPLATE_DIR
} from "@xarc/render-context";
import { expect } from "chai";
import { SimpleRenderer } from "../../src/simple-renderer";
// const { SimpleRenderer } = require("../../src/simple-renderer");
import * as Path from "path";
import * as Fs from "fs";
import * as _ from "lodash";
import * as xstdout from "xstdout";

describe("simple renderer", function () {
  it("requires htmlFile in the constructor", function () {
    const renderer = new SimpleRenderer({
      htmlFile: "./test/data/template1.html",
      tokenHandlers: "./test/fixtures/token-handler",
      routeOptions: {}
    });
    renderer.initializeRenderer(true);

    expect(renderer._tokens[0].str).to.equal("<html>\n\n<head>");
    expect(renderer._tokens[1].id).to.equal("ssr-content");
    expect(renderer._tokens[2].isModule).to.be.false;
  });
  it("should parse template multi line tokens with props", () => {
    const htmlFile = Path.join(__dirname, "../data/template3.html");
    const silentIntercept = true;
    const intercept = xstdout.intercept(silentIntercept);

    const asyncTemplate = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    asyncTemplate.initializeRenderer();
    intercept.restore();

    const expected = [
      {
        str: "<html>\n\n<head>"
      },
      {
        id: "ssr-content",
        isModule: false,
        pos: 17,
        props: {
          attr: ["1", "2", "3"],
          args: ["a", "b", "c"],
          empty: "",
          foo: "bar a [b] c",
          hello: "world",
          test: true
        },
        custom: undefined,
        wantsNext: undefined
      },
      {
        id: "prefetch-bundles",
        isModule: false,
        pos: 148,
        props: {},
        custom: undefined,
        wantsNext: undefined
      },
      {
        str: `<script>\n    console.log("test")`
      },
      {
        id: "blah",
        isModule: false,
        pos: 222,
        props: {},
        custom: undefined,
        wantsNext: undefined
      },
      {
        str: "</script>"
      },
      {
        id: "meta-tags",
        isModule: false,
        pos: 264,
        props: {},
        custom: undefined,
        wantsNext: undefined
      },

      {
        str: "</head>\n\n</html>"
      },
      {
        id: "page-title",
        isModule: false,
        pos: 301,
        props: {},
        custom: undefined,
        wantsNext: undefined
      },
      {
        custom: undefined,
        id: "json-prop",
        isModule: false,
        pos: 326,
        props: {
          foo: "bar",
          test: [1, 2, 3]
        },
        wantsNext: undefined
      },
      {
        custom: undefined,
        id: "space-tags",
        isModule: false,
        pos: 396,
        props: {},
        wantsNext: undefined
      },
      {
        custom: undefined,
        id: "new-line-tags",
        isModule: false,
        pos: 421,
        props: {},
        wantsNext: undefined
      },
      {
        custom: undefined,
        id: "space-newline-tag",
        isModule: false,
        pos: 456,
        props: {
          attr1: "hello",
          attr2: "world",
          attr3: "foo"
        },
        wantsNext: undefined
      },
      {
        _modCall: ["setup"],
        custom: {
          name: "custom-call"
        },
        id: `require("../fixtures/custom-call")`,
        isModule: true,
        modPath: "../fixtures/custom-call",
        pos: 536,
        props: {
          _call: "setup"
        },
        wantsNext: false
      }
    ];
    expect(typeof _.last(asyncTemplate.tokens).custom.process).to.equal("function");
    delete _.last(asyncTemplate.tokens).custom.process;
    expect(asyncTemplate.tokens).to.deep.equal(expected);
  });

  it("should throw for token with invalid props", () => {
    const htmlFile = Path.join(__dirname, "../data/template4.html");
    expect(
      () =>
        new SimpleRenderer({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(
      `at line 9 col 3 - 'prefetch-bundles bad-prop' has malformed prop: name must be name=Val;`
    );
  });
});
