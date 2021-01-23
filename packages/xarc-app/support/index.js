"use strict";

const support = require("../dist");

//
// support module was transpiled from ts and it's ES module
// this file is meant to bridge old code to the new ESM one so having the default
// helps with ES module interop usage.
//

Object.defineProperty(support, "default", {
  enumerable: false,
  get() {
    return this;
  }
});

module.exports = support;
