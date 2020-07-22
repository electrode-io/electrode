"use strict";

const failLoadDev = require("../lib/fail-load-dev");

try {
  require("@xarc/app-dev/lib/babel-run");
} catch (err) {
  failLoadDev(err);
}
