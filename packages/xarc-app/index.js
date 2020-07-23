"use strict";

const failLoadDev = require("./lib/fail-load-dev");

let loadXrunTasks;

try {
  loadXrunTasks = require("@xarc/app-dev");
} catch (err) {
  failLoadDev(err);
}

module.exports = loadXrunTasks;
