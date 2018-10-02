"use strict";

const Fs = require("fs");
const assert = require("assert");

//
// This specifies a general order of partials to be applied.
// Any new partial need to be added here.  Name is the filename
// without extension and add an _ prefix.
//
const orders = [
  "_base-options",
  "_entry",
  "_node",
  "_output",
  "_resolve",
  "_resolve-loader",
  "_test-base",
  "_test-entry",
  "_test-output",
  "_test-resolve",
  "_babel",
  "_extract-style",
  "_fonts",
  "_images",
  "_isomorphic",
  "_pwa",
  "_stats",
  "_uglify",
  "_locales",
  "_define",
  "_sourcemaps-remote",
  "_fail",
  "_coverage",
  "_dev",
  "_dll-entry",
  "_dll-output",
  "_dll-reference",
  "_dll-load",
  "_dll",
  "_hot",
  "_html-reporter",
  "_simple-progress",
  "_sourcemaps-inline",
  "_node"
];

const files = Fs.readdirSync(__dirname)
  .filter(x => x !== "index.js")
  .map(x => x.substr(0, x.length - 3));

module.exports = {
  orders,
  partials: files.reduce((a, p) => {
    const k = `_${p}`;
    assert(orders.indexOf(k) >= 0, `No default order specified for partial ${p}`);
    a[k] = { config: () => require(`./${p}`) };
    return a;
  }, {})
};
