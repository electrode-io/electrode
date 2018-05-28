"use strict";

const Promise = require("bluebird");
const Path = require("path");
const AsyncTemplate = require("../../lib/async-template");
const xstdout = require("xstdout");

const expect = require("chai").expect;

describe("render-context", function() {
  it("should render template with all token types", () => {
    const htmlFile = Path.resolve("test/fixtures/test-render-context.html");
    let internalHandler = {};
    let internalTokens = {};
    let receivedResult = "";
    const send = x => {
      receivedResult += x;
    };
    const asyncTemplate = new AsyncTemplate({
      htmlFile,
      tokenHandlers: {
        name: "internal-test-handler",
        beforeRender: context => {
          context.setOutputSend(send);
          internalTokens = context.getTokens("internal-test-handler");
        },
        afterRender: context => {
          internalHandler = context.getTokenHandler("internal-test-handler");
        },
        tokens: {
          "internal-test": () => `\nbuilt-in for internal-test`
        }
      }
    });

    const expected = `
from wants next module
from async ok module
from async error module
from string only module
built-in for internal-test
from async error module
from wants next module<!-- unhandled token test-not-found -->
from string only module
from async ok module`;
    const intercept = xstdout.intercept(true);
    return Promise.try(() => asyncTemplate.render({}))
      .then(result => {
        intercept.restore();
        expect(
          internalHandler.name,
          "lookup internal-test-handler with context.getTokenHandler failed"
        ).to.equal("internal-test-handler");
        expect(internalTokens).to.have.property("internal-test");
        expect(intercept.stdout).to.deep.equal([
          "token process for #./test/fixtures/async-error failed async-error\n",
          "token process for #./test/fixtures/async-error failed async-error\n"
        ]);
        expect(result).to.equal("");
        expect(receivedResult).to.equal(expected);
      })
      .catch(err => {
        intercept.restore();
        throw err;
      });
  });
});
