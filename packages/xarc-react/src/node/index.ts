import {
  subAppReady,
  loadSubApp,
  declareSubApp as dsa,
  SubAppDef,
  SubAppOptions,
  SubAppFeatureFactory
} from "@xarc/subapp";
import { __createDynamicComponent, CreateComponentOptions } from "../common/create-component";
import { SSRReactLib } from "./react-lib-node";
import { __reactFrameworkFeature, __addFeature } from "../common";
import { appContextFeature } from "./feat-app-context-node";

//
// re-exports
//
export * from "../common/index";
export * from "@xarc/tag-renderer";
export * from "./render-page";
export * from "./feat-static-props-node";
export { SSRReactLib, subAppReady, loadSubApp, appContextFeature };

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
 * declare a subapp to use React framework (node.js version)
 *
 * @param options - subapp options
 */
export function __declareSubApp(options: SubAppOptions): SubAppDef {
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
