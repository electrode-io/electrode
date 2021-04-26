import {
  subAppReady,
  loadSubApp,
  declareSubApp as dsa,
  SubAppDef,
  SubAppOptions,
  SubAppFeatureFactory,
  RenderOptions,
  PageRenderer
} from "@xarc/subapp";
import { __createDynamicComponent, CreateComponentOptions } from "../common/create-component";
import { SSRReactLib } from "./react-lib-node";
import { __reactFrameworkFeature, __addFeature } from "../common/internal";
import { appContextFeature } from "./feat-app-context-node";

//
// re-exports
//
export * from "../common/index";
export * from "@xarc/tag-renderer";
export * from "./feat-static-props-node";
export * from "./subapp-as-component";
export { AppContext } from "../common/app-context";
export { SSRReactLib, subAppReady, loadSubApp, appContextFeature, RenderOptions, PageRenderer };

/**
 * Add React framework feature to a subapp (node.js version)
 *
 * This is added as default if you use `declareSubApp` or `createDynamicComponent` from `@xarc/react`
 *
 */
export function reactFrameworkFeature(): SubAppFeatureFactory {
  return __reactFrameworkFeature((...args) => new SSRReactLib(...args));
}

/**
 * Declare a subapp.
 *
 * - Your file that implements the SubApp should export it with the name `subapp`.
 *
 * For Example, to declare a subapp named `"Sample"` to load its implementation module
 * `sample.tsx`:
 *
 * **Subapp implementation module:** `sample.tsx`
 *
 * ```tsx
 * import { ReactSubApp, React } from "@xarc/react";
 *
 * const Sample = () => <div>Sample<div/>
 *
 * export subapp: ReactSubApp = {
 *   Component: Sample,
 *   wantFeatures: [
 *     // additional features for the subapp
 *   ]
 * }
 * ```
 *
 * **Your app entry module:** `app.tsx`
 *
 * ```tsx
 * import { declareSubApp } from "@xarc/react";
 *
 * export const Sample = declareSubApp({
 *   name: "Sample",
 *   getModule: () => import("./sample")
 * })
 * ```
 *
 * @param options - subapp options
 */
function __declareSubApp(options: SubAppOptions): SubAppDef {
  // add framework feature if it's not exist
  let opts = __addFeature(options, "framework", reactFrameworkFeature);
  opts = __addFeature(opts, "app-context-provider", appContextFeature);
  return dsa(opts);
}

export { __declareSubApp as declareSubApp };

/**
 * create a dynamic component for the React framework (node.js version)
 *
 * @param optDef - SubAppOptions or SubAppDef
 * @param options - create component options
 *
 * @returns a React component that will be dynamic import
 */
export function createDynamicComponent(
  optDef: SubAppDef | SubAppOptions,
  options: CreateComponentOptions = {}
) {
  return __createDynamicComponent(optDef, options, __declareSubApp);
}
