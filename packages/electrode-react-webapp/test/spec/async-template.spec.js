"use strict";

const AsyncTemplate = require("../../lib/async-template");
const Path = require("path");
const expect = require("chai").expect;
const _ = require("lodash");
const xstdout = require("xstdout");

const silentIntercept = true;

describe("async-template", function() {
  let intercept;

  afterEach(() => {
    if (intercept) {
      intercept.restore();
    }
    intercept = undefined;
  });

  it("should parse template into tokens", () => {
    const htmlFile = Path.join(__dirname, "../data/template1.html");
    intercept = xstdout.intercept(silentIntercept);
    const asyncTemplate = new AsyncTemplate({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    asyncTemplate.initializeRenderer();
    asyncTemplate.initializeRenderer(); // test re-entry
    intercept.restore();
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

  const template2Expected = [
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
      id: "webapp-body-bundles",
      isModule: false,
      pos: 183,
      custom: undefined,
      wantsNext: undefined,
      props: {}
    },
    {
      id: "meta-tags",
      isModule: false,
      pos: 215,
      custom: undefined,
      wantsNext: undefined,
      props: {}
    },
    { str: "</head>\n\n</html>" },
    {
      id: "page-title",
      isModule: false,
      pos: 252,
      custom: undefined,
      wantsNext: undefined,
      props: {}
    }
  ];

  it("should parse template with token at end", () => {
    const htmlFile = Path.join(__dirname, "../data/template2.html");
    intercept = xstdout.intercept(silentIntercept);
    const asyncTemplate = new AsyncTemplate({
      htmlFile,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    asyncTemplate.initializeRenderer();
    intercept.restore();

    expect(asyncTemplate.tokens).to.deep.equal(template2Expected);
  });

  it("should parse template multi line tokens with props", () => {
    const htmlFile = Path.join(__dirname, "../data/template3.html");

    intercept = xstdout.intercept(silentIntercept);

    const asyncTemplate = new AsyncTemplate({
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
        id: "#../fixtures/custom-call",
        isModule: true,
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
        new AsyncTemplate({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(
      `at line 9 col 3 - 'prefetch-bundles bad-prop' has malformed prop: name must be name=Val;`
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
      `at line 4 col 3 - 'ssr-content attr[1,2,3]' has malformed prop: name must be name=Val;`
    );
  });

  it("should throw for token empty body", () => {
    const htmlFile = Path.join(__dirname, "../data/template7.html");
    expect(
      () =>
        new AsyncTemplate({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(`at line 3 col 5 - empty token body`);
  });

  it("should throw for token missing close tag", () => {
    const htmlFile = Path.join(__dirname, "../data/template8.html");
    expect(
      () =>
        new AsyncTemplate({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(`at line 3 col 5 - Can't find token close tag for '<!--\\n      %{'`);
  });

  it("should throw for token with value that has mismatching '", () => {
    const htmlFile = Path.join(__dirname, "../data/template6.html");
    expect(
      () =>
        new AsyncTemplate({
          htmlFile,
          tokenHandlers: "./test/fixtures/token-handler"
        })
    ).to.throw(`at line 4 col 3 - 'ssr-content foo='bar' has malformed prop: mismatch quote ';`);
  });

  describe("addTokens", function() {
    const insertTokens = [
      { token: "a" },
      { token: "b", props: { foo: 1 } },
      { token: "c", props: `bar="50"` },
      { token: "#./test/fixtures/custom-call", props: { _call: "setup" } }
    ];
    const insertExpected = [
      {
        id: "a",
        isModule: false,
        pos: -1,
        custom: undefined,
        wantsNext: undefined,
        props: {}
      },
      {
        id: "b",
        isModule: false,
        pos: -1,
        custom: undefined,
        wantsNext: undefined,
        props: { foo: 1 }
      },
      {
        id: "c",
        isModule: false,
        pos: -1,
        custom: undefined,
        wantsNext: undefined,
        props: { bar: "50" }
      },
      {
        id: "#./test/fixtures/custom-call",
        isModule: true,
        pos: -1,
        custom: { name: "custom-call" },
        wantsNext: false,
        props: { _call: "setup" },
        _modCall: ["setup"]
      }
    ];

    it("should insert tokens at the beginning for first", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const x = asyncTemplate.addTokens({
        insert: "first",
        tokens: insertTokens
      });
      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(x).to.equal(0);

      const customCallTokens = asyncTemplate.findTokensById("#./test/fixtures/custom-call");
      delete customCallTokens[0].token.custom.process;

      expect(asyncTemplate.tokens.slice(x, 4)).to.deep.equal(insertExpected);
      expect(asyncTemplate.tokens.slice(4)).to.deep.equal(template2Expected);
    });

    it("should insert tokens at the end for last", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const x = asyncTemplate.addTokens({
        insert: "last",
        tokens: insertTokens
      });
      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(x).to.equal(template2Expected.length);

      const customCallTokens = asyncTemplate.findTokensById("#./test/fixtures/custom-call");
      delete customCallTokens[0].token.custom.process;

      expect(asyncTemplate.tokens.slice(0, x)).to.deep.equal(template2Expected);
      expect(asyncTemplate.tokens.slice(x)).to.deep.equal(insertExpected);
    });

    it("should insert tokens before another token", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const x = asyncTemplate.addTokens({
        insert: "before",
        id: "webapp-body-bundles",
        tokens: insertTokens
      });
      asyncTemplate.initializeRenderer();
      intercept.restore();
      const customCallTokens = asyncTemplate.findTokensById("#./test/fixtures/custom-call");
      delete customCallTokens[0].token.custom.process;

      // check new inserted tokens are valid
      const anchor = asyncTemplate.findTokensById("webapp-body-bundles")[0];
      expect(asyncTemplate.tokens.slice(x, anchor.index)).to.deep.equal(insertExpected);
      // check tokens w/o what got inserted are valid
      const tokens = [].concat(asyncTemplate.tokens);
      tokens.splice(x, insertExpected.length);
      expect(tokens).to.deep.equal(template2Expected);
    });

    it("should insert tokens after another token", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const x = asyncTemplate.addTokens({
        insert: "after",
        id: "webapp-body-bundles",
        tokens: insertTokens
      });
      asyncTemplate.initializeRenderer();
      intercept.restore();
      const customCallTokens = asyncTemplate.findTokensById("#./test/fixtures/custom-call");
      delete customCallTokens[0].token.custom.process;

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles")[0];
      expect(anchor.index + 1).to.equal(x);

      // check new inserted tokens are valid
      expect(asyncTemplate.tokens.slice(x, x + insertExpected.length)).to.deep.equal(
        insertExpected
      );
      // check tokens w/o what got inserted are valid
      const tokens = [].concat(asyncTemplate.tokens);
      tokens.splice(x, insertExpected.length);
      expect(tokens).to.deep.equal(template2Expected);
    });

    it("should insert tokens default to after another token by instance", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const x = asyncTemplate.addTokens({
        id: "webapp-body-bundles",
        instance: 1,
        tokens: insertTokens
      });
      asyncTemplate.initializeRenderer();
      intercept.restore();
      const customCallTokens = asyncTemplate.findTokensById("#./test/fixtures/custom-call");
      delete customCallTokens[0].token.custom.process;

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles")[1];
      expect(anchor.index + 1).to.equal(x);
      // check new inserted tokens are valid
      expect(asyncTemplate.tokens.slice(x, x + insertExpected.length)).to.deep.equal(
        insertExpected
      );
      // check tokens w/o what got inserted are valid
      const tokens = [].concat(asyncTemplate.tokens);
      tokens.splice(x, insertExpected.length);
      expect(tokens).to.deep.equal(template2Expected);
    });

    it("should insert tokens after an index", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles")[0];

      const x = asyncTemplate.addTokens({
        insert: "after",
        index: anchor.index,
        tokens: insertTokens
      });
      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(x).to.equal(anchor.index + 1);
      const customCallTokens = asyncTemplate.findTokensById("#./test/fixtures/custom-call");
      delete customCallTokens[0].token.custom.process;

      // check new inserted tokens are valid
      expect(asyncTemplate.tokens.slice(x, x + insertExpected.length)).to.deep.equal(
        insertExpected
      );
      // check tokens w/o what got inserted are valid
      const tokens = [].concat(asyncTemplate.tokens);
      tokens.splice(x, insertExpected.length);
      expect(tokens).to.deep.equal(template2Expected);
    });

    it("should insert tokens before an index", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles")[1];

      const x = asyncTemplate.addTokens({
        insert: "before",
        index: anchor.index,
        tokens: insertTokens
      });
      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(x).to.equal(anchor.index);
      const customCallTokens = asyncTemplate.findTokensById("#./test/fixtures/custom-call");
      delete customCallTokens[0].token.custom.process;

      // check new inserted tokens are valid
      expect(asyncTemplate.tokens.slice(x, x + insertExpected.length)).to.deep.equal(
        insertExpected
      );
      // check tokens w/o what got inserted are valid
      const tokens = [].concat(asyncTemplate.tokens);
      tokens.splice(x, insertExpected.length);
      expect(tokens).to.deep.equal(template2Expected);
    });

    it("should return false if try to insert before non existing token id", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const x = asyncTemplate.addTokens({
        insert: "before",
        id: "foo-bar",
        tokens: insertTokens
      });
      expect(x).to.equal(false);
    });

    it("should throw error if insert is invalid", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(() =>
        asyncTemplate.addTokens({
          insert: "foo",
          id: "webapp-body-bundles",
          instance: 1,
          tokens: insertTokens
        })
      ).to.throw(`"foo" is not valid`);
    });
  });

  describe("removeTokens", function() {
    const testRemove1 = (options = {}) => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const instance = options.hasOwnProperty("instance") ? options.instance : 0;
      const anchor = asyncTemplate.findTokensById("webapp-body-bundles");
      const expected = [].concat(template2Expected);
      expected.splice(anchor[instance].index, 1);

      const removed = asyncTemplate.removeTokens(
        Object.assign(
          {
            id: "webapp-body-bundles"
          },
          options
        )
      );

      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(removed.length).to.equal(1);
      expect(removed[0].id).to.equal("webapp-body-bundles");

      expect(asyncTemplate.tokens).to.deep.equal(expected);
    };

    it("should remove a single token with id by default", () => {
      testRemove1();
    });

    it("should remove second instance of a single token with id by default", () => {
      testRemove1({ instance: 1 });
    });

    it("should remove a single token with id by using before", () => {
      testRemove1({ remove: "before" });
    });

    it("should remove second instance of a single token with id by using before", () => {
      testRemove1({ instance: 1, remove: "before" });
    });

    it("should return false if id not found", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const removed = asyncTemplate.removeTokens({
        id: "foo-bar"
      });
      expect(removed).to.equal(false);
    });

    const testRemove2Before = (options = {}) => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const instance = options.hasOwnProperty("instance") ? options.instance : 0;
      const anchor = asyncTemplate.findTokensById("webapp-body-bundles");
      const expected = [].concat(template2Expected);
      expected.splice(anchor[instance].index - 1, 2);

      const removed = asyncTemplate.removeTokens(
        Object.assign(
          {
            remove: "before",
            count: 2,
            id: "webapp-body-bundles"
          },
          options
        )
      );

      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(removed.length).to.equal(2);
      expect(_.last(removed).id).to.equal("webapp-body-bundles");

      expect(asyncTemplate.tokens).to.deep.equal(expected);
    };

    it("should remove 2 tokens before id", () => {
      testRemove2Before();
    });

    it("should remove 2 tokens before id's second instance", () => {
      testRemove2Before({ instance: 1 });
    });

    it("should remove 2 tokens before index", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles");
      const expected = [].concat(template2Expected);
      expected.splice(anchor[0].index - 1, 2);

      const removed = asyncTemplate.removeTokens({
        remove: "before",
        count: 2,
        index: anchor[0].index
      });

      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(removed.length).to.equal(2);
      expect(_.last(removed).id).to.equal("webapp-body-bundles");

      expect(asyncTemplate.tokens).to.deep.equal(expected);
    });

    it("should handle removing more tokens than available before id", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles");
      const expected = [].concat(template2Expected);
      expected.splice(0, anchor[0].index + 1);

      const removed = asyncTemplate.removeTokens({
        remove: "before",
        count: 50,
        id: "webapp-body-bundles"
      });

      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(removed.length).to.equal(anchor[0].index + 1);
      expect(_.last(removed).id).to.equal("webapp-body-bundles");

      expect(asyncTemplate.tokens).to.deep.equal(expected);
    });

    it("should handle removing more tokens than available before id, removeSelf false", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles");
      const expected = [].concat(template2Expected);
      expected.splice(0, anchor[0].index);

      const removed = asyncTemplate.removeTokens({
        remove: "before",
        removeSelf: false,
        count: 50,
        id: "webapp-body-bundles"
      });

      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(removed.length).to.equal(anchor[0].index);
      expect(_.last(removed).id).to.not.equal("webapp-body-bundles");

      expect(asyncTemplate.tokens).to.deep.equal(expected);
    });

    it("should handle removing more tokens than available after id", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles");
      const expected = [].concat(template2Expected);
      expected.splice(anchor[0].index, expected.length);

      const removed = asyncTemplate.removeTokens({
        remove: "after",
        count: 50,
        id: "webapp-body-bundles"
      });

      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(removed.length).to.equal(template2Expected.length - anchor[0].index);
      expect(_.first(removed).id).to.equal("webapp-body-bundles");

      expect(asyncTemplate.tokens).to.deep.equal(expected);
    });

    it("should handle removing more tokens than available after id, removeSelf false", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const anchor = asyncTemplate.findTokensById("webapp-body-bundles");
      const expected = [].concat(template2Expected);
      expected.splice(anchor[0].index + 1, expected.length);

      const removed = asyncTemplate.removeTokens({
        remove: "after",
        removeSelf: false,
        count: 50,
        id: "webapp-body-bundles"
      });

      asyncTemplate.initializeRenderer();
      intercept.restore();
      expect(removed.length).to.equal(template2Expected.length - anchor[0].index - 1);
      expect(_.first(removed).id).to.not.equal("webapp-body-bundles");

      expect(asyncTemplate.tokens).to.deep.equal(expected);
    });

    it("should throw if remove is invalid", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      intercept = xstdout.intercept(silentIntercept);
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(() =>
        asyncTemplate.removeTokens({
          remove: "blah",
          count: 50,
          id: "webapp-body-bundles"
        })
      ).to.throw(`"blah" must be before|after`);
    });
  });

  describe("_findTokenIndex", function() {
    it("should validate and return index", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(asyncTemplate._findTokenIndex(null, null, 0)).to.equal(0);
      expect(asyncTemplate._findTokenIndex(null, null, 1)).to.equal(1);
      expect(asyncTemplate._findTokenIndex(null, null, 2)).to.equal(2);
      expect(asyncTemplate._findTokenIndex(null, null, 3)).to.equal(3);
    });

    it("should find token by id and return its index", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(asyncTemplate._findTokenIndex("webapp-body-bundles")).to.equal(3);
    });

    it("should return false if token by id is not found", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(asyncTemplate._findTokenIndex("foo-bar")).to.equal(false);
    });

    it("should find token by str and return its index", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(asyncTemplate._findTokenIndex(null, `console.log("test")`)).to.equal(5);
      expect(asyncTemplate._findTokenIndex(null, /console.log/)).to.equal(5);
    });

    it("should return false if token by str is not found", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(asyncTemplate._findTokenIndex(null, `foo-bar-test-blah-blah`)).to.equal(false);
      expect(asyncTemplate._findTokenIndex(null, /foo-bar-test-blah-blah/)).to.equal(false);
    });

    it("should throw if id, str, and index are invalid", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(() => asyncTemplate._findTokenIndex()).to.throw(`invalid id, str, and index`);
    });

    it("should throw if index is out of range", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(() => asyncTemplate._findTokenIndex(null, null, -1)).to.throw(
        `index -1 is out of range`
      );
      expect(() =>
        asyncTemplate._findTokenIndex(null, null, asyncTemplate.tokens.length + 100)
      ).to.throw(` is out of range`);
    });
  });

  describe("findTokenByStr", function() {
    it("should find tokens by str and return result", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      const x = asyncTemplate.findTokensByStr(`html`, asyncTemplate.tokens.length);
      expect(x.length).to.equal(2);
      const x2 = asyncTemplate.findTokensByStr(/html/, 1);
      expect(x2.length).to.equal(1);
      const x3 = asyncTemplate.findTokensByStr(/html/, 0);
      expect(x3.length).to.equal(0);
    });

    it("should return false if token by str is not found", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(asyncTemplate.findTokensByStr(`foo-bar-test-blah-blah`)).to.deep.equal([]);
      expect(asyncTemplate.findTokensByStr(/foo-bar-test-blah-blah/, null)).to.deep.equal([]);
    });

    it("should throw if matcher is invalid", () => {
      const htmlFile = Path.join(__dirname, "../data/template2.html");
      const asyncTemplate = new AsyncTemplate({
        htmlFile,
        tokenHandlers: "./test/fixtures/token-handler"
      });

      expect(() => asyncTemplate.findTokensByStr(null)).to.throw(
        "matcher must be a string or RegExp"
      );
    });
  });
});
