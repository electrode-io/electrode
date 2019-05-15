"use strict";

const Path = require("path");
const Fs = require("fs");
const { JsxRenderer, Component, IndexPage } = require("../../..").jsx;
const Template = require("../../jsx-templates/test1").default;
const Template2 = require("../../jsx-templates/test2").default;
const Template3 = require("../../jsx-templates/test3").default;

describe("Component", function() {
  it("should have isComponent and render method", () => {
    const x = new Component();
    expect(x.isComponent()).to.equal(true);
    expect(x.render()).to.equal("component");
  });
});

describe("IndexPage", function() {
  it("should have static memoize", () => {
    expect(IndexPage.memoize({})).equal(`<!DOCTYPE html>`);
    expect(IndexPage.memoize({ DOCTYPE: "blah" })).equal(`<!DOCTYPE blah>`);
  });
});

describe("Jsx Renderer", function() {
  it("getTokenInst should return undefined if no token instance", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    expect(renderer.getTokenInst({ props: { _id: "blah" } })).to.equal(undefined);
  });

  it("should have re-entrant initializeRenderer", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "./test/fixtures/token-handler"
    });
    renderer.initializeRenderer();
    renderer.initializeRenderer(true);
    renderer.initializeRenderer();
  });

  const test1ExpectedOutput = Fs.readFileSync(
    Path.join(__dirname, "test1-output.txt"),
    "utf8"
  ).trim();

  it("should render index page in JSX", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    const verify = context => {
      const r = context.output._result
        .trim()
        .split("\n")
        .map(x => x.trimRight())
        .join("\n");

      expect(r).equal(test1ExpectedOutput);
    };

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      verify(context);
      return renderer.render({}).then(verify);
    });
  });

  it("should handle failure in nesting async components", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test2")),
      template: Template2,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      expect(context.result.message).equal("test async component fail");
    });
  });

  const test3ExpectedOutput = Fs.readFileSync(
    Path.join(__dirname, "test3-output.txt"),
    "utf8"
  ).trim();

  it("should handle component nesting children", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test3")),
      template: Template3,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      const r = context.output._result
        .trim()
        .split("\n")
        .map(x => x.trimRight())
        .join("\n");

      expect(r).to.equal(test3ExpectedOutput);
    });
  });
});
