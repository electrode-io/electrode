/* eslint-disable comma-dangle, arrow-parens, no-param-reassign */
/**
 * @packageDocumentation
 * @module index
 */

import { Component } from "./Component";
import { Token } from "./tags/Token";
import { IndexPage } from "./tags/IndexPage";
import { Require } from "./tags/Require";
import { Literal } from "./tags/Literal";
import { JsxRenderer } from "./JsxRenderer";

/** @ignore */
export { Component, Token, IndexPage, Require, Literal, JsxRenderer };

let ELEMENT_ID = 0;

export type Element = {
  id: number;
  type: any;
  children: any;
  props: object;
  tag?: string;
  Construct?: Function;
  memoize?: any;
};

export function createElement(type: any, props: any, ...children: any[]) {
  console.log("create element ", props);
  children = children.length > 0 ? children : undefined;

  if (children) {
    children = children.reduce((a, c) => a.concat(c), []);
  }

  if (!props) {
    props = { children };
  } else {
    props = { ...props, children };
  }

  const element: Element = {
    id: ELEMENT_ID++,
    type,
    children,
    props
  };

  const literal = typeof type === "string";
  console.log(type);
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
