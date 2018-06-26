"use strict";

const AsyncTemplate = require("../../lib/async-template");
const Path = require("path");
const expect = require("chai").expect;
const _ = require("lodash");

describe("AsyncTemplate._parseTemplate", function() {
  it("should parse template into tokens", () => {
    const htmlFile = Path.join(__dirname, "../data/template1.html");
    const asyncTemplate = new AsyncTemplate({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    const expected = [
      { str: "<html>\n\n<head>" },
      {
        id: "ssr-content",
        isModule: false,
        pos: 17,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "webapp-header-bundles",
        isModule: false,
        pos: 41,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "webapp-body-bundles",
        isModule: false,
        pos: 75,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "page-title",
        isModule: false,
        pos: 107,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "prefetch-bundles",
        isModule: false,
        pos: 130,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      { str: `<script>\n    console.log("test")\n  </script>` },
      {
        id: "meta-tags",
        isModule: false,
        pos: 206,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "#critical-css",
        isModule: true,
        pos: 228,
        custom: undefined,
        wantsNext: false,
        props: {}
      },
      { str: "</head>\n\n</html>" }
    ];
    const criticalCssToken = asyncTemplate.tokens[8];
    expect(criticalCssToken.custom.process()).to.equal(
      `\ntoken process module critical-css not found\n`
    );
    criticalCssToken.custom = undefined;

    expect(asyncTemplate.tokens).to.deep.equal(expected);
  });

  it("should parse template with token at end", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    const asyncTemplate = new AsyncTemplate({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    const expected = [
      { str: "<html>\n\n<head>" },
      {
        id: "ssr-content",
        isModule: false,
        pos: 17,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "webapp-header-bundles",
        isModule: false,
        pos: 41,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "webapp-body-bundles",
        isModule: false,
        pos: 75,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "prefetch-bundles",
        isModule: false,
        pos: 107,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      { str: `<script>\n    console.log("test")\n  </script>` },
      {
        id: "meta-tags",
        isModule: false,
        pos: 183,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      { str: "</head>\n\n</html>" },
      {
        id: "page-title",
        isModule: false,
        pos: 220,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      }
    ];
    expect(asyncTemplate.tokens).to.deep.equal(expected);
  });

  it("should parse template multi line tokens with props", () => {
    const htmlFile = Path.join(__dirname, "../data/template3.html");
    const asyncTemplate = new AsyncTemplate({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });

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
        _modCall: ["setup"],
        custom: {
          name: "custom-call"
        },
        id: "#./test/fixtures/custom-call",
        isModule: true,
        pos: 396,
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
        new AsyncTemplate({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(
      "token prefetch-bundles at position 83 has malformed prop 'bad-prop': name must be name="
    );
  });

  it("should throw for token with invalid prop name", () => {
    const htmlFile = Path.join(__dirname, "../data/template5.html");
    expect(
      () =>
        new AsyncTemplate({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(
      "token ssr-content at position 17 has malformed prop 'attr[1,2,3]': name must be name="
    );
  });

  it("should throw for token with value that has mismatching '", () => {
    const htmlFile = Path.join(__dirname, "../data/template6.html");
    expect(
      () =>
        new AsyncTemplate({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw("has malformed prop 'foo='bar': mismatch quote '");
  });
});
