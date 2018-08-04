"use strict";

const Promise = require("bluebird");
const Path = require("path");
const AsyncTemplate = require("../../lib/async-template");
const RenderContext = require("../../lib/render-context");
const xstdout = require("xstdout");

const expect = require("chai").expect;

describe("render-context", function() {
  it("should handle setting all stop modes", () => {
    const context = new RenderContext({}, {});
    context.stop = RenderContext.FULL_STOP;
    expect(context.isFullStop).to.equal(true);
    context.softStop();
    expect(context.isSoftStop).to.equal(true);
    context.voidStop();
    expect(context.isVoidStop).to.equal(true);
    context.fullStop();
    expect(context.isFullStop).to.equal(true);
  });

  it("should render template with all token types", () => {
    const htmlFile = Path.resolve("test/fixtures/test-render-context.html");
    let internalHandler = {};
    let internalTokens = {};
    let receivedResult = "";
    const send = x => {
      receivedResult += x;
    };
    const errors = [];
    const asyncTemplate = new AsyncTemplate({
      htmlFile,
      tokenHandlers: {
        name: "internal-test-handler",
        beforeRender: context => {
          context.setOutputSend(send);
          internalTokens = context.getTokens("internal-test-handler");
          context.handleError = err => errors.push(err);
        },
        afterRender: context => {
          internalHandler = context.getTokenHandler("internal-test-handler");
        },
        tokens: {
          INITIALIZE: "",
          "internal-test": () => `\nbuilt-in for internal-test`,
          "non-func-token": "\ntest non-func token"
        }
      }
    });

    const expected = `
from wants next module
from async ok module
from async error module
from string only module
built-in for internal-test
test non-func token
from async error module
from wants next module<!-- unhandled token test-not-found -->
from string only module
from async ok module`;
    const intercept = xstdout.intercept(false);
    return Promise.try(() => asyncTemplate.render({}))
      .then(context => {
        intercept.restore();
        expect(
          internalHandler.name,
          "lookup internal-test-handler with context.getTokenHandler failed"
        ).to.equal("internal-test-handler");
        expect(internalTokens).to.have.property("internal-test");
        expect(errors).to.deep.equal([
          "error from test/fixtures/async-error",
          "error from test/fixtures/async-error"
        ]);
        expect(context.result).to.equal("");
        expect(receivedResult).to.equal(expected);
      })
      .catch(err => {
        intercept.restore();
        throw err;
      });
  });
});
