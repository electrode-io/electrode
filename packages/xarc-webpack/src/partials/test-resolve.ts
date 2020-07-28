/* eslint-disable @typescript-eslint/no-var-requires */

const optionalRequire = require("optional-require")(require);

// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

module.exports = () => ({
  resolve: {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: process.cwd(),
      sinon: optionalRequire.resolve("sinon/pkg/sinon") || ""
    }
  }
});
