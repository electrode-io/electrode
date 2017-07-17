"use strict";

const fs = require("fs");
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

  describe("setupOptions", function() {
    it("should enable https if ENV is set", () => {
      process.env.WEBPACK_DEV_HTTPS = "true";
      const x = reactWebapp.setupOptions({});
      return x.then(opt => expect(opt.__internals.devBundleBase).to.match(/^https:/));
    });
  });

  describe("makeRouteHandler", function() {
    it("should invoke replaceToken for built-in tokens", () => {
      const ssrContent = "hey this is the content";
      const testTitle = "Test Electrode Web Application";
      const customMeta = `<meta name="x-custom" value="foo"/>`;

      const replaceToken = (token, context, getDefault) => {
        switch (token) {
          case "SSR_CONTENT":
            return ssrContent;
          case "PAGE_TITLE":
            return Promise.resolve(`<title>${testTitle}</title>`);
          case "META_TAGS":
            // It's also possible to utilize the defaultValue in the replacement value
            return getDefault().then(value => `${value}${customMeta}`);
          default:
            return getDefault();
        }
      };

      return reactWebapp
        .setupOptions({
          pageTitle: "should get overidden",
          iconStats: "./test/data/icon-stats-test-pwa.json",
          criticalCSS: "./test/data/critical.css"
        })
        .then(options => {
          const handler = reactWebapp.makeRouteHandler(
            Object.assign(options, {
              htmlFile: "./test/data/index-1.html",
              replaceToken
            })
          );

          return handler({});
        })
        .then(html => {
          expect(html).to.contain(`<div class="js-content">${ssrContent}</div>`);

          expect(html).to.contain(`<title>${testTitle}</title>`);
          expect(html).to.contain(`<meta charset="UTF-8">`);
          // The custom meta tag should have been appended to the ones from the iconStats file
          expect(html).to.contain(`<link rel="icon" href="/js/favicon-32x32.png">${customMeta}`);
          expect(html).to.contain(
            `<style>${fs.readFileSync(Path.resolve("./test/data/critical.css"))}</style>`
          );
        });
    });

    it("should replace custom tokens", () => {
      return reactWebapp
        .setupOptions()
        .then(options => {
          const handler = reactWebapp.makeRouteHandler(
            Object.assign(options, {
              htmlFile: "./test/data/custom-tokens.html"
            })
          );

          return handler({});
        })
        .then(html => {
          expect(html).to.contain(`<div class="custom-1">custom replacement string</div>`);
          expect(html).to.contain(`<div class="custom-2">custom replacement with promise</div>`);
        });
    });
  });
});
