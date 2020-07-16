/* @jsx createElement */

/* eslint-disable no-unused-vars, comma-dangle, arrow-parens */

import * as Path from "path";
import * as Fs from "fs";
import { JsxRenderer, IndexPage, createElement } from "../../src";
import Template from "../jsx-templates/test1";
import Template2 from "../jsx-templates/test2";
import Template3 from "../jsx-templates/test3";
import { expect } from "chai";
import Template4 from "../jsx-templates/test4";
import Template5 from "../jsx-templates/test5";
import Template6 from "../jsx-templates/test6";
import Template7 from "../jsx-templates/test7";
import Template8 from "../jsx-templates/test8";
import Template9 from "../jsx-templates/test9";
import Template91 from "../jsx-templates/test91";
import TemplateRegisterTokenIds from "../jsx-templates/test-register-token-ids";
import * as xstdout from "xstdout";
import { asyncVerify, runFinally } from "run-verify";

describe("IndexPage", function () {
  it("should have static memoize", () => {
    expect(IndexPage.memoize({})).equal(`<!DOCTYPE html>`);
    expect(IndexPage.memoize({ DOCTYPE: "blah" })).equal(`<!DOCTYPE blah>`);
  });
});

describe("Jsx Renderer", function () {
  it("getTokenInst should return undefined if no token instance", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "../fixtures/token-handler"
    });
    expect(renderer.getTokenInst({ props: { _id: "blah" } })).to.equal(undefined);
  });

  it("should have re-entrant initializeRenderer", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "../fixtures/token-handler"
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
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test1")),
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
      tokenHandlers: "../fixtures/token-handler"
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
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test1")),
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
      tokenHandlers: "../fixtures/token-handler"
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
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test1")),
      template: Template,
      tokenHandlers: "../fixtures/token-handler"
    });

    const verify = context => {
      const r = context.output._result
        .trim()
        .split("\n")
        .map(x => x.trimRight())
        .join("\n");

      expect(r).contains(test1ExpectedOutput);
    };

    renderer.initializeRenderer();

    const intercept = xstdout.intercept(true);

    return asyncVerify(
      () => renderer.render({}),
      verify,
      () => renderer.render({}),
      verify,
      runFinally(() => {
        intercept.restore();
      })
    );
  });

  it("should handle failure in nesting async components", async () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: null, // test passing no templateFullPath so CWD would be used
      template: Template2,
      tokenHandlers: "./test/fixtures/token-handler"
    });

    renderer.initializeRenderer();

    const context = await renderer.render({});
    expect(context.result.message).equal("test async component fail");
  });

  it("should have unique Token instances for multiple tokens with same _id", () => {
    const renderer = new JsxRenderer({
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test4")),
      template: Template4,
      tokenHandlers: "../fixtures/token-handler"
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
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test3")),
      template: Template3,
      tokenHandlers: "../fixtures/token-handler"
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

  it("should handle element memoize in tokens", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: false,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test5")),
      template: Template5,
      tokenHandlers: "../fixtures/token-handler"
    });

    const verify = context => {
      const r = context.output._result
        .trim()
        .split("\n")
        .map(x => x.trimRight())
        .join("\n");

      expect(r).to.not.contain("<!-- BEGIN"); // no insert token IDs
      expect(r).contains(`Token content should be memoized 1`);
    };

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      verify(context);
      return renderer.render({}).then(verify);
    });
  });

  it("should handle token with unknown ID", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: false,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test6")),
      template: Template6,
      tokenHandlers: "../fixtures/token-handler"
    });

    const verify = context => {
      expect(context.output._result).contains(
        `Hello

World`
      );
    };

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      verify(context);
      return renderer.render({}).then(verify);
    });
  });

  it("should handle token throwing sync error", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test7")),
      template: Template7,
      tokenHandlers: "../fixtures/token-handler"
    });

    const verify = context => {
      expect(context.result).to.be.an("Error");
      expect(context.result.message).contains("test token sync throwing");
    };

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      verify(context);
      return renderer.render({}).then(verify);
    });
  });

  it("should handle token throwing async error", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test8")),
      template: Template8,
      tokenHandlers: "../fixtures/token-handler"
    });

    const verify = context => {
      expect(context.result).to.be.an("Error");
      expect(context.result.message).contains("test token async throw");
    };

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      verify(context);
      return renderer.render({}).then(verify);
    });
  });

  it("should handle JSX tag throw a sync error", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test9")),
      template: Template9,
      tokenHandlers: "../fixtures/token-handler"
    });

    const verify = context => {
      expect(context.result).to.be.an("Error");
      expect(context.result.message).contains("test JSX tag sync error");
    };

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      verify(context);
      return renderer.render({}).then(verify);
    });
  });

  it("should handle JSX tag throw an async error", () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test91")),
      template: Template91,
      tokenHandlers: [
        "../fixtures/token-handler",
        {
          name: "test1",
          beforeRender: () => {
            //
          },
          afterRender: () => {
            //
          },
          tokens: {}
        }
      ]
    });

    const verify = context => {
      expect(context.result).to.be.an("Error");
      expect(context.result.message).contains("test JSX tag async error");
    };

    renderer.initializeRenderer();

    const promise = renderer.render({});
    return promise.then(context => {
      verify(context);
    });
  });

  it("should handle LoadTokenHandler from template", async () => {
    const renderer = new JsxRenderer({
      insertTokenIds: true,
      templateFullPath: Path.dirname(require.resolve("../jsx-templates/test91")),
      template: TemplateRegisterTokenIds
    });

    renderer.initializeRenderer();
    const context = await renderer.render({});
    const result = await context.result;
    expect(result).contains("this is a test<!-- FOO END -->");
    expect(result).contains("<div>user-token-1</div>");
  });
});
