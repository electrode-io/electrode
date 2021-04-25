import React from "react";
import ReactDom from "react-dom";
import ReactDomServer from "react-dom/server";
import { SubApp } from "@xarc/subapp";

export { xarcV2 } from "@xarc/subapp";

/**
 * The type for the implementation of a SubApp using the React framework.
 *
 * @remark See {@link declareSubApp} for more example to declare a subapp from
 * the implementation.
 *
 * Example:
 *
 * ```tsx
 * import { ReactSubApp, React } from "@xarc/react";
 *
 * const Sample = () => <div>sample react component</div>
 *
 * export subapp: ReactSubApp = {
 *   Component: Sample
 * }
 * ```
 *
 */
export type ReactSubApp = SubApp<React.Component | React.FunctionComponent>;

//
// re-exports
//
export { React, ReactDom, ReactDomServer };
export { AppContext } from "./app-context";
export { CreateComponentOptions } from "./create-component";
export { Component } from "react";

export {
  StaticPropsMethodParams,
  getStaticPropsMethod,
  StaticPropsServerModule,
  StaticPropsFeatureOptions
} from "./feat-static-props-types";
export { AppContextFeatureOptions } from "./feat-app-context-types";

/**
 * Options to inline a subapp as a component nesting within another subapp
 */
export type SubAppInlineOptions = {
  /** Run SSR on the inlined subapp */
  ssr?: boolean;
};
