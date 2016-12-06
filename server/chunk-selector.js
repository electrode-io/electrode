"use strict";

var CHUNKS = {
  ENTRY: {
    js: "entry",
    css: "entry"
  }
};

var getChunks = function (path) {
  /* Return "entry" for all paths */
  if (path.startsWith("/")) {
    return CHUNKS.ENTRY;
  }
};

module.exports = function (request) {
  return getChunks(request.path);
};
