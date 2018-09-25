"use strict";

const Fs = require("fs");
const assert = require("assert");

//
// This specifies a general order of partials to be applied.
// Any new partial need to be added here.  Name is the filename
// without extension and add an _ prefix.
//
const orders = [
  "_entry",
  "_resolve",
  "_output",
  "_dll",
  "_optimize",
  "_define",
  "_output",
  "_stats"
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
