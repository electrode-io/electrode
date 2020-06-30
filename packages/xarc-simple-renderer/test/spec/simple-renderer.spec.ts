import {
  RenderContext,
  TokenModule,
  loadTokenModuleHandler,
  TOKEN_HANDLER,
  TEMPLATE_DIR
} from "@xarc/render-context";
import { expect } from "chai";
import { SimpleRenderer } from "../../src/simple-renderer";
import * as Path from "path";
import * as Fs from "fs";
import * as _ from "lodash";
import * as xstdout from "xstdout";

describe("simple renderer", function () {
  it("requires htmlFile in the constructor", function () {
    const renderer = new SimpleRenderer({
      htmlFile: "./test/data/template1.html",
      tokenHandlers: "./test/fixtures/token-handler"
    });
    renderer.initializeRenderer(true);

    expect(renderer._tokens[0].str).to.equal("<html>\n\n<head>");
    expect(renderer._tokens[1].id).to.equal("ssr-content");
    expect(renderer._tokens[2].isModule).to.be.false;
  });
  it("it locates tokens", function () {
    const renderer = new SimpleRenderer({
      htmlFile: "./test/data/template2.html",
      tokenHandlers: "./test/fixtures/token-handler"
    });
    renderer.initializeRenderer(true);

    expect(renderer._tokens[0].str).to.equal("<html>\n\n<head>");
    expect(renderer._tokens[1].id).to.equal("ssr-content");
    expect(renderer._tokens[2].isModule).to.be.false;
  });
});

describe("_findTokenIndex", function () {
  it("should validate and return index", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(simpleRenderer._findTokenIndex(null, null, 0)).to.equal(0);
    expect(simpleRenderer._findTokenIndex(null, null, 1)).to.equal(1);
    expect(simpleRenderer._findTokenIndex(null, null, 2)).to.equal(2);
    expect(simpleRenderer._findTokenIndex(null, null, 3)).to.equal(3);
  });

  it("should find token by id and return its index", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(simpleRenderer._findTokenIndex("webapp-body-bundles")).to.equal(3);
  });

  it("should return false if token by id is not found", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(simpleRenderer._findTokenIndex("foo-bar")).to.equal(false);
  });

  it("should find token by str and return its index", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(simpleRenderer._findTokenIndex(null, `console.log("test")`)).to.equal(5);
  });

  it("should return false if token by str is not found", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(simpleRenderer._findTokenIndex(null, `foo-bar-test-blah-blah`)).to.equal(false);
    expect(simpleRenderer._findTokenIndex(null, /foo-bar-test-blah-blah/)).to.equal(false);
  });

  it("should throw if id, str, and index are invalid", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(() => simpleRenderer._findTokenIndex()).to.throw(`invalid id, str, and index`);
  });

  it("should throw if index is out of range", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(() => simpleRenderer._findTokenIndex(null, null, -1)).to.throw(
      `index -1 is out of range`
    );
    expect(() =>
      simpleRenderer._findTokenIndex(null, null, simpleRenderer.tokens.length + 100)
    ).to.throw(` is out of range`);
  });
});

describe("findTokenByStr", function () {
  it("should find tokens by str and return result", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    const x = simpleRenderer.findTokensByStr(`html`, simpleRenderer.tokens.length);
    expect(x.length).to.equal(2);
    const x2 = simpleRenderer.findTokensByStr(/html/, 1);
    expect(x2.length).to.equal(1);
    const x3 = simpleRenderer.findTokensByStr(/html/, 0);
    expect(x3.length).to.equal(0);
  });

  it("should return false if token by str is not found", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(simpleRenderer.findTokensByStr(`foo-bar-test-blah-blah`)).to.deep.equal([]);
    expect(simpleRenderer.findTokensByStr(/foo-bar-test-blah-blah/, null)).to.deep.equal([]);
  });

  it("should throw if matcher is invalid", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    expect(() => simpleRenderer.findTokensByStr(null)).to.throw(
      "matcher must be a string or RegExp"
    );
  });
});
describe("intialzieRenderer: ", function () {
  it("should parse template multi line tokens with props", () => {
    const htmlFile = Path.join(__dirname, "../data/template3.html");
    const silentIntercept = true;
    const intercept = xstdout.intercept(silentIntercept);

    const simpleRenderer = new SimpleRenderer({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    simpleRenderer.initializeRenderer();
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
    expect(typeof _.last(simpleRenderer.tokens).custom.process).to.equal("function");
    delete _.last(simpleRenderer.tokens).custom.process;
    expect(simpleRenderer.tokens).to.deep.equal(expected);
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
  it("should throw for token empty body", () => {
    const htmlFile = Path.join(__dirname, "../data/template7.html");
    expect(
      () =>
        new SimpleRenderer({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(`at line 3 col 5 - empty token body`);
  });
  it("should throw for token empty body", () => {
    const htmlFile = Path.join(__dirname, "../data/template7.html");
    expect(
      () =>
        new SimpleRenderer({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(`at line 3 col 5 - empty token body`);
  });

  it("should throw for token missing close tag", () => {
    const htmlFile = Path.join(__dirname, "../data/template8.html");
    expect(
      () =>
        new SimpleRenderer({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(`at line 3 col 5 - Can't find token close tag for '<!--\\n      %{'`);
  });
});

describe("before-renderer", function () {
  const htmlFile = Path.join(__dirname, "../data/template2.html");
  const renderer = new SimpleRenderer({
    htmlFile,
    tokenHandlers: "./test/fixtures/non-render-error"
  });
  renderer.initializeRenderer();
  // expect(() => renderer.render({})).to.throw("error from test/fixtures/non-render-error");
});
