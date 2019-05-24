"use strict";

const Component = require("./Component");
const Token = require("./Token");
const IndexPage = require("./IndexPage");
const Require = require("./Require");
const Literal = require("./Literal");
const JsxRenderer = require("./JsxRenderer");

let ELEMENT_ID = 0;

function createElement(type, props, ...children) {
  children = children.length > 0 ? children : undefined;

  if (children) {
    children = children.reduce((a, c) => a.concat(c), []);
  }

  if (!props) {
    props = { children };
  } else {
    props = Object.assign({ children }, props);
  }

  const element = {
    id: ELEMENT_ID++,
    type,
    children,
    props
  };

  const literal = typeof type === "string";

  if (literal) {
    element.tag = type.toLowerCase();
  } else if (type.prototype && type.prototype.isComponent) {
    element.Construct = type;
  }

  if (!literal && type.memoize && props._memoize !== false) {
    element.memoize = type.memoize(props, children);
  }

  return element;
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
