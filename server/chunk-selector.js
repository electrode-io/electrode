"use strict";

const CHUNKS = {
  DEFAULT: {
    js: "",
    css: ""
  },
  ENTRY: {
    js: "entry",
    css: "entry"
  }
};

const getChunks = (path) => {

  /* Return "entry" for all paths */
  if (path.startsWith("/")) {
    return CHUNKS.ENTRY;
  }

  return CHUNKS.DEFAULT;
}

module.exports = (request) => {
  return getChunks(request.path);
};
