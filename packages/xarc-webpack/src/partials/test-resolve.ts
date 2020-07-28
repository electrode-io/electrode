"use strict";

const optionalRequire = require("optional-require")(require);
module.exports = () => ({
  resolve: {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: process.cwd(),
      sinon: optionalRequire.resolve("sinon/pkg/sinon") || ""
    }
  }
});
