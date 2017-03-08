"use strict";

module.exports = {
  resolve: {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: process.cwd(),
      sinon: require.resolve("sinon/pkg/sinon")
    }
  }
};
