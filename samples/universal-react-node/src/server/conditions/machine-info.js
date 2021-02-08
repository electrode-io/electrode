"use strict"; //  eslint-disable-line

import os from "os";

module.exports = {
  numCpus: () => os.cpus().length,
  loadAvgs: () => os.loadavg(),
  totalMem: () => os.totalmem()
};
