"use strict";

const os = require("os");

module.exports = {
  numCpus: () => os.cpus().length,
  loadAvgs: () => os.loadavg(),
  totalMem: () => os.totalmem()
};
