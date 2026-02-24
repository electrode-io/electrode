import type { Component, FunctionComponent } from "react";
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
 * import { ReactSubApp } from "@xarc/react";
 * import React from "react";
 *
 * const Sample = () => <div>sample react component</div>;
 *
 * export const subapp: ReactSubApp = {
 *   Component: Sample
 * };
 * ```
 */
export type ReactSubApp = SubApp<Component | FunctionComponent>;

//
// re-exports (type-only React exports for consumers that need the types)
//
export type { FC, Component, ComponentType, ReactNode } from "react";
export { AppContext } from "./app-context";
export { CreateComponentOptions } from "./create-component";

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
