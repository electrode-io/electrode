/* eslint-disable no-param-reassign */
/**
 * @packageDocumentation
 * @module @xarc/jsx-renderer
 */

import { Component } from "./Component";
import { JsxRenderer } from "./JsxRenderer";
import { Token } from "./tags/Token";
import { IndexPage } from "./tags/IndexPage";
import { Require } from "./tags/Require";
import { Literal } from "./tags/Literal";
import { RegisterTokenIds } from "./tags/RegisterTokenIds";
import { xarcJsxElement } from "./symbols";

/** @ignore */
export { Component, Token, IndexPage, Require, Literal, JsxRenderer, RegisterTokenIds, xarcJsxElement };

let ELEMENT_ID = 0;

export type Element = {
  $$typeof: symbol;
  id: number;
  type: any;
  children: any;
  props: object;
  tag?: string;
  Construct?: Function;
  memoize?: any;
};

export function createElement(type: any, props: any, ...children: any[]) {
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
    $$typeof: xarcJsxElement,
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
