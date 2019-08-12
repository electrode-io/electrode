"use strict";

const machine = require("./machine-info");

/*
 * LOAD THRESHOLD
 * --------------
 * When we divide the load average for the last minute,
 * and the load average for the last 5 minutes, by the
 * number of processors in the machine, this threshold is
 * the number at which we consider the load being excessive,
 * if BOTH the 1 and 5 min average exceed it.
 *
 * The default is 4, based on the assumption that 5.0 equals
 * meltdown: http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages
 */
const DEFAULT_LOAD_THRESHOLD = 4;

/*
 * MEMORY THRESHOLD
 * ----------------
 * This number is the fraction of the total system memory that is
 * in use (1.0 = 100%). The default is 0.8, taking as an assumption
 * 80% memory usage would be an excessive figure.
 */
const DEFAULT_MEM_THRESHOLD = 0.8;

/* eslint no-magic-numbers: [2, {"ignore": [-1, 0, 1]}] */
module.exports = _opts => {
  return function machineLoadCondition(request, reply) {
    // Check server load, disable if too high
    const numCpus = machine.numCpus();
    const loadAvgs = machine.loadAvgs();

    const THRESHOLD_LOAD = _opts.loadThreshold || DEFAULT_LOAD_THRESHOLD;
    const THRESHOLD_MEM = _opts.memoryThreshold || DEFAULT_MEM_THRESHOLD;

    // 1min and 5min load average is over threshold
    // when factoring in number of CPUs
    if (
      (loadAvgs[0] / numCpus) > THRESHOLD_LOAD && //eslint-disable-line
      (loadAvgs[1] / numCpus) > THRESHOLD_LOAD || //eslint-disable-line
      (request.server.load.rss / machine.totalMem()) > THRESHOLD_MEM //eslint-disable-line
      // Memory usage is over threshold % of total mem
    ) {
      request.app.disableSSR = true;

      return reply.continue();
    }
    return reply.continue();
  };
};
