"use strict";

const statsUtils = require("../lib/stats-utils");
const stats = require("./stats_err.json");

const byPkg = statsUtils.getModulesByPkg(stats);

const data = {
  info: statsUtils.getInfo(stats),
  assets: statsUtils.getAssets(stats),
  modulesByPkg: byPkg.modulesByPkg,
  totalSizeByPkg: byPkg.totalSize,
  warnings: statsUtils.getWarningsHtml(stats),
  errors: statsUtils.getErrorsHtml(stats),
  legacy: statsUtils.jsonToHtml(stats, true)
};

function clean(obj) {
  for (const k in obj) {
    const x = obj[k];
    delete x.identifier;
    delete x.issuer;
    delete x.cacheable;
    delete x.built;
    delete x.optional;
    delete x.prefetched;
    if (typeof x === "object") {
      clean(x);
    }
  }
}

clean(data);

console.log(JSON.stringify(data, null, 2)); // eslint-disable-line
