"use strict";

const Fs = require("fs");
const Path = require("path");
const customToken = require("../../lib/custom-token");
const parseTemplate = require("../../lib/parse-template");
const RenderContext = require("../../lib/render-context");
const xstdout = require("xstdout");

const expect = require("chai").expect;

describe("render-context", function() {
  it("should render template with all token types", () => {
    const tokens = parseTemplate(
      Fs.readFileSync(Path.resolve("test/fixtures/test-render-context.html")).toString()
    );

    customToken.loadAll(tokens);
    const context = new RenderContext({
      routeData: {
        htmlTokens: tokens,
        tokenHandlers: [
          {
            "internal-test": () => `\nbuilt-in for internal-test`
          }
        ]
      }
    });
    const expected = `
from wants next module
from async ok module
from async error module
from string only module
built-in for internal-test
from async error module
from wants next module
from string only module
from async ok module`;
    const intercept = xstdout.intercept(true);
    return context
      .render()
      .then(result => {
        intercept.restore();
        expect(intercept.stdout).to.deep.equal([
          "token process for #./test/fixtures/async-error failed async-error\n",
          "token process for #./test/fixtures/async-error failed async-error\n"
        ]);
        expect(result).to.equal(expected);
      })
      .catch(err => {
        intercept.restore();
        throw err;
      });
  });
});
