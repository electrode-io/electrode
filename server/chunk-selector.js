"use strict";

const CHUNKS = {
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

  return {
    js: "",
    css: ""
  };
};

module.exports = (request) => {
  return getChunks(request.path);
};
