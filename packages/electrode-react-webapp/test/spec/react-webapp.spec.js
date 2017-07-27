"use strict";

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
});
