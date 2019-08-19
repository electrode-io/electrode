"use strict";

const DEFAULT_LONG_RESPONSE_THRESHOLD_MS = 5000;
const DEFAULT_LONG_RESPONSE_AMOUNT = 6;
const DEFAULT_DISABLE_EXPIRY_MINS = 2;
const MS_IN_SEC = 1000;
const SEC_IN_MIN = 60;

module.exports = {
  detector: _opts => {
    const longResponseThreshold = _opts.longResponseThreshold ||
      DEFAULT_LONG_RESPONSE_THRESHOLD_MS;
    const longResponseAmount = _opts.longResponseAmount ||
      DEFAULT_LONG_RESPONSE_AMOUNT;
    const disableExpiryMins = _opts.disableExpiryMins ||
      DEFAULT_DISABLE_EXPIRY_MINS;

    return function responseTimeConditionDetector(request) {
      // Measure elapsed time, increment number of tracked long response
      // times if over threshold
      if ((request.info.responded - request.info.received) >= longResponseThreshold) {//eslint-disable-line
        ++request.server.app.longResponses;
      }

      // If number of tracked long response times exceeds permissible
      // amount, disable SSR for specified number of minutes
      if (request.server.app.longResponses > longResponseAmount) {
        const expires = Date.now() + (disableExpiryMins * MS_IN_SEC * SEC_IN_MIN); //eslint-disable-line

        request.server.app.disableSSR = true;
        request.server.app.disableSSRExpiry = expires;
        request.server.app.longResponses = 0;
      }
    };
  },
  actor: function responseTimeConditionActor(request, reply) {
    if (request.server.app.disableSSR) {
      if (request.info.received > request.server.app.disableSSRExpiry) {
        request.server.app.disableSSR = false;
      }

      request.app.disableSSR = true;
    }
    reply.continue();
  }
};
