// node.js

export * from "../subapp/index";

import {
  __declareSubApp,
  SubAppOptions,
  envHooks,
  SubAppDef,
  SubAppContainer
} from "../subapp/index";

const CONTAINER: SubAppContainer = {};

/**
 * Get the subapp container
 *
 * @returns subapp container
 */
export function getContainer(): SubAppContainer {
  return CONTAINER;
}

/**
 * Declare a subapp.
 *
 * **NOTE**: A webpack plugin will statically analyze the code to extract the subapp info
 *   so options must be a literal object in place.  It cannot be a variable declared elsewhere.
 *
 * GOOD:
 *
 * ```js
 * export const subapp1 = declareSubApp({
 *   name: "Subapp1",
 *   getModule: () => import("subapp1")
 * })
 * ```
 *
 * BAD:
 *
 * ```js
 * const subappInfo = { name: "Subapp1", getModule: () => import("subapp1")};
 * export const subapp1 = declareSubApp(subappInfo);
 * ```
 *
 * @param options - options
 * @returns subapp definition
 */
export function declareSubApp(options: SubAppOptions): SubAppDef {
  if (!envHooks.getContainer) {
    envHooks.getContainer = getContainer;
  }
  return __declareSubApp(options);
}

/**
 * boolean that indicate if app is running in the browser
 */
export const IS_BROWSER = false;

export { SubAppServer } from "./subapp-server";
