"use strict";

const Path = require("path");
const reactWebapp = require("../../lib/react-webapp");

describe("react-webapp", function() {
  describe("resolveContent", function() {
    it("should require module with relative path", () => {
      const f = "./test/data/foo.js";
      expect(reactWebapp.resolveContent({ module: f })).to.equal("hello");
    });

    it("should require module", () => {
      let mod;
      const fooRequire = x => (mod = x);
      const f = "test";
      expect(reactWebapp.resolveContent({ module: f }, fooRequire)).to.equal(f);
      expect(mod).to.equal(f);
    });
  });

  describe("makeRouteHandler", () => {
    it("should not add default handler if it's already included in options", () => {
      const htmlFile = Path.resolve("test/fixtures/test-render-context.html");
      const defaultReactHandler = Path.join(__dirname, "../../lib/react/token-handlers");
      return reactWebapp
        .makeRouteHandler({
          htmlFile,
          tokenHandlers: [
            {
              name: "internal-test-handler",
              beforeRender: context => {
                expect(context.user).to.equal(false);
              },
              afterRender: context => {
                expect(context.user).to.not.equal(false);
              },
              tokens: {
                "internal-test": () => "\ninternal-test",
                "test-not-found": () => "\nnot found"
              }
            },
            defaultReactHandler
          ],
          __internals: { assets: {}, chunkSelector: () => ({}) }
        })({ request: {}, content: { status: 200, html: "" } })
        .then(result => {
          const expected = `
from wants next module
from async ok module
from async error module
from string only module
internal-test
from async error module
from wants next module
not found
from string only module
from async ok module`;
          expect(result).to.equal(expected);
        });
    });
  });

  describe("setupOptions", function() {
    it("should enable https if ENV is set", () => {
      process.env.WEBPACK_DEV_HTTPS = "true";
      const opt = reactWebapp.setupOptions({});
      expect(opt.__internals.devBundleBase).to.match(/^https:/);
    });
  });
});
