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
  css: "home",
  js: "home"
};
const MULTI_BUNDLE = {
  css: ["foo", "bar"],
  js: "home"
};

module.exports = request => {
  if (request.path.endsWith("/foo")) {
    return FOO_BUNDLE;
  } else if (request.path.endsWith("/bar")) {
    return BAR_BUNDLE;
  } else if (request.path.endsWith("/multi-chunk")) {
    return MULTI_BUNDLE;
  } else if (request.path.endsWith("/empty")) {
    return {};
  }

  return DEFAULT_BUNDLE;
};
