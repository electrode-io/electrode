"use strict";

const DEFAULT_EVENTLOOP_DELAY_MS = 40;

module.exports = _opts => {
  return function serverLoadCondition(request, reply) {
    const THRESHOLD_EVENTLOOP_DELAY_MS = _opts.eventLoopDelayThreshold ||
      DEFAULT_EVENTLOOP_DELAY_MS;

    if (request.server.load.eventLoopDelay >= THRESHOLD_EVENTLOOP_DELAY_MS) {
      request.app.disableSSR = true;
    }
    return reply.continue();
  };
};
