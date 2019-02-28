"use strict";

const HttpStatusCodes = require("http-status-codes");

module.exports = {
  // Status codes where we might want to keep custom html
  displayHtml: {
    [HttpStatusCodes.NOT_FOUND]: true,
    [HttpStatusCodes.GONE]: true,
    [HttpStatusCodes.SERVICE_UNAVAILABLE]: true
  },

  // Status codes where we want to redirect the user
  redirect: {
    [HttpStatusCodes.MOVED_PERMANENTLY]: true,
    [HttpStatusCodes.MOVED_TEMPORARILY]: true,
    [HttpStatusCodes.PERMANENT_REDIRECT]: true,
    [HttpStatusCodes.TEMPORARY_REDIRECT]: true
  }
};
