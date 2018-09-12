"use strict";

const Path = require("path");
const reactWebapp = require("../../lib/react-webapp");
const xstdout = require("xstdout");

describe("react-webapp", function() {
  describe("resolveContent", function() {
    it("should require module with relative path", () => {
      const f = "./test/data/foo.js";
      expect(reactWebapp.resolveContent({ module: f }).content).to.equal("hello");
    });

    it("should log error if resolving content fail", () => {
      const intercept = xstdout.intercept(true);
      const f = "./test/data/bad-content.js";
      const content = reactWebapp.resolveContent({ module: f });
      intercept.restore();
      expect(content.content).includes("test/data/bad-content.js failed");
      expect(intercept.stderr.join("")).includes("Error: Cannot find module 'foo-blah'");
    });

    it("should require module", () => {
      let mod;
      const fooRequire = x => (mod = x);
      fooRequire.resolve = x => x;
      const f = "test";
      const content = reactWebapp.resolveContent({ module: f }, fooRequire);
      expect(content.content).to.equal(f);
      expect(content.fullPath).to.equal(f);
      expect(mod).to.equal(f);
    });
  });

  describe("makeRouteHandler", () => {
    it("should not add default handler if it's already included in options", () => {
      const htmlFile = Path.resolve("test/fixtures/test-render-context.html");
      const defaultReactHandler = Path.join(__dirname, "../../lib/react/token-handlers");
      const intercept = xstdout.intercept(false);
      const handleRoute = reactWebapp.makeRouteHandler({
        htmlFile,
        tokenHandlers: [
          {
            name: "internal-test-handler",
            beforeRender: context => {
              expect(context.user).to.equal(false);
              context.handleError = () => {};
            },
            afterRender: context => {
              expect(context.user, "should have context.user").to.not.equal(false);
            },
            tokens: {
              "internal-test": () => "\ninternal-test",
              "test-not-found": () => "\nnot found",
              "non-func-token": ""
            }
          },
          defaultReactHandler
        ],
        __internals: { assets: {}, chunkSelector: () => ({}) }
      });

      const promise = handleRoute({ request: {}, content: { status: 200, html: "" } });

      return promise
        .then(context => {
          intercept.restore();
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
          expect(context.result).to.equal(expected);
        })
        .catch(err => {
          intercept.restore();
          throw err;
        });
    });

    it("should not add default handler replaceTokenHandlers is true", () => {
      const htmlFile = Path.resolve("test/fixtures/test-render-context.html");
      const intercept = xstdout.intercept(false);
      const handleRoute = reactWebapp.makeRouteHandler({
        htmlFile,
        replaceTokenHandlers: true,
        tokenHandlers: [
          {
            name: "internal-test-handler",
            beforeRender: context => {
              expect(context.user).to.equal(false);
              context.handleError = () => {};
            },
            tokens: {
              "internal-test": () => "\ninternal-test",
              "test-not-found": () => "\nnot found",
              "non-func-token": ""
            }
          }
        ],
        __internals: { assets: {}, chunkSelector: () => ({}) }
      });

      const promise = handleRoute({ request: {}, content: { status: 200, html: "" } });

      return promise
        .then(context => {
          intercept.restore();
          const expected = `<!-- unhandled token INITIALIZE -->
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
          expect(context.result).to.equal(expected);
        })
        .catch(err => {
          intercept.restore();
          throw err;
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
