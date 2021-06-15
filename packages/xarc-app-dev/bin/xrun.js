#!/usr/bin/env node
const requireAt = require("require-at")(process.cwd());

function invoke() {
  let xrunFull;

  try {
    xrunFull = requireAt.resolve("@xarc/run/bin/xrun");
  } catch {
    //
  }

  if (xrunFull && xrunFull.startsWith(process.cwd())) {
    require(xrunFull);
  } else {
    require("@xarc/run/bin/xrun");
  }
}

invoke();
//# fynSourceMap=false
