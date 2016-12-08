"use strict";

const FOO_BUNDLE = {
  css: "foo",
  js: "foo"
};
const BAR_BUNDLE = {
  css: "bar",
  js: "bar"
};
const DEFAULT_BUNDLE = {
  css: "",
  js: ""
};

module.exports = (request) => {
  if (request.path.endsWith("/foo")) {
    return FOO_BUNDLE;
  } else if (request.path.endsWith("/bar")) {
    return BAR_BUNDLE;
  }

  return DEFAULT_BUNDLE;
};
