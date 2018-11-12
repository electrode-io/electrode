"use strict";

const Fs = require("fs");
const assert = require("assert");

const orders = [
  "_base-options",
  "_entry",
  "_output",
  "_resolve",
  "_resolve-loader",
  "_test-base",
  "_test-entry",
  "_test-output",
  "_test-resolve",
  "_test-resolve-loader",
  "_babel",
  "_extract-style",
  "_fonts",
  "_images",
  "_uglify",
  "_define",
  "_sourcemaps-remote",
  "_sourcemaps-inline",
  "_fail",
  "_coverage",
  "_dev_mode",
  "_prod_mode",
];

const files = Fs.readdirSync(__dirname).filter((x) => x !== "index.js").map((x) => x.substr(0, x.length - 3));

module.exports = {
  orders,
  partials: files.reduce((a, p) => {
    const k = `_${p}`;
    assert(orders.indexOf(k) >= 0, `No default order specified for partial ${p}`);
    a[k] = {
      config: () => require(`./${p}`)
    };
    return a;
  }, {})
};
