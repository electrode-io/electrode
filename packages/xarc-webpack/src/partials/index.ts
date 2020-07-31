/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable global-require, no-magic-numbers */

import * as Fs from "fs";
const assert = require("assert");
const Partial = require("webpack-config-composer/lib/partial");

//
// This specifies a general order of partials to be applied.
// Any new partial need to be added here.  Name is the filename
// without extension and add an _ prefix.
//
const orders = [
  "_base-options",
  "_entry",
  "_subapp-chunks",
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
  "_loadable",
  "_fonts",
  "_images",
  "_isomorphic",
  "_pwa",
  "_stats",
  "_uglify",
  "_locales",
  "_sourcemaps-remote",
  "_fail",
  "_coverage",
  "_dev",
  "_dll-entry",
  "_dll-output",
  "_dll-reference",
  "_dll-load",
  "_dll",
  "_simple-progress",
  "_sourcemaps-inline",
  "_node",
  "_dev-mode",
  "_prod-mode"
];

const files = Fs.readdirSync(__dirname)
  .filter(x => x !== "index.js" && !x.endsWith(".d.ts") && !x.endsWith(".map") && x !== "index.ts")
  .map(x => x.substr(0, x.length - 3));

const partials = files.reduce((a, p) => {
  const k = `_${p}`;
  assert(orders.indexOf(k) >= 0, `No default order specified for partial ${p}`);
  a[k] = new Partial(k, { config: require(`./${p}`) });
  return a;
}, {});

module.exports = partials;
