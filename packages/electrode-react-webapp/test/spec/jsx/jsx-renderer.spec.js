/* @jsx createElement */

/* eslint-disable no-unused-vars */

"use strict";

const Path = require("path");
const Fs = require("fs");
const { JsxRenderer, Component, IndexPage, createElement } = require("../../..").jsx;
import Template from "../../jsx-templates/test1";
import Template2 from "../../jsx-templates/test2";
import Template3 from "../../jsx-templates/test3";

import Template4 from "../../jsx-templates/test4";

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

  it("should give top level Components depth 0", () => {
    const TestDepth = (props, context, scope) => {
      return `TestDepth: ${scope.depth}`;
    };
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      // IndexPage doesn't nest its children so depth doesn't increase from it
      template: (
        <IndexPage>
          <html>
            <head />
            <body>
              <TestDepth />
            </body>
          </html>
        </IndexPage>
      ),
      tokenHandlers: "./test/fixtures/token-handler"
    });
    renderer.initializeRenderer();
    return renderer.render({}).then(context => {
      expect(context.output._result).contains("TestDepth: 0");
    });
  });

  it("should recreate nest Components and give them depth > 0", () => {
    const TestDepth2 = (props, context, scope) => {
      return `TestDepth2: ${scope.depth} elementId: ${scope.element.id}`;
    };

    const TestDepth1 = (props, context, scope) => {
      return (
        <div>
          {`TestDepth1: ${scope.depth} elementId: ${scope.element.id}`}
          <TestDepth2
          // A directly nested Component is created again in every rendering pass
          />
          {props.children}
        </div>
      );
    };

    const TestDepth0 = (props, context, scope) => {
      return (
        <div>
          {`TestDepth0: ${scope.depth} elementId: ${scope.element.id}`}
          {props.children}
        </div>
      );
    };

    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test1")),
      // IndexPage doesn't nest its children so depth doesn't increase from it
      template: (
        <IndexPage>
          <html>
            <head />
            <body>
              <TestDepth0>
                <TestDepth1 />
              </TestDepth0>
            </body>
          </html>
        </IndexPage>
      ),
      tokenHandlers: "./test/fixtures/token-handler"
    });

    renderer.initializeRenderer();
    const testRender = () => renderer.render({}).then(context => context.output._result);

    const results = [];
    return testRender()
      .then(r => results.push(r))
      .then(testRender)
      .then(r => results.push(r))
      .then(() => {
        results.forEach(r => {
          expect(r).contains("TestDepth0: 0");
          expect(r).contains("TestDepth1: 1");
          expect(r).contains("TestDepth2: 2");
        });
        const regex = /TestDepth2: 2 elementId: ([0-9]+)\n/;
        const a = parseInt(results[0].match(regex)[1]);
        const b = parseInt(results[1].match(regex)[1]);
        expect(a).to.be.above(0);
        expect(b).to.be.above(0);
        expect(b).to.be.above(a);
      });
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

  it("should have unique Token instances for multiple tokens with same _id", () => {
    const renderer = new JsxRenderer({
      templateFullPath: Path.dirname(require.resolve("../../jsx-templates/test4")),
      template: Template4,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      const r = context.output._result.split("\n").join("_");
      expect(r).contains("require1_require2_require3");
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
