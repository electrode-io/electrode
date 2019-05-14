"use strict";

const Component = require("./Component");
const Token = require("./Token");
const IndexPage = require("./IndexPage");
const Require = require("./Require");
const Literal = require("./Literal");
const JsxRenderer = require("./JsxRenderer");

function createElement(type, props, ...children) {
  children = children.length > 0 ? children : undefined;

  if (!props) {
    props = {};
  }

  const x = {
    type,
    children,
    props
  };

  const literal = typeof type === "string";

  if (literal) {
    x.tag = type.toLowerCase();
  } else if (type.prototype && type.prototype.isComponent) {
    x.Construct = type;
  }

  if (!literal && type.memoize && props._memoize !== false) {
    x.memoize = type.memoize(props, children);
  }

  return x;
}

module.exports = {
  Component,
  Token,
  Literal,
  IndexPage,
  Require,
  JsxRenderer,
  createElement
};
