import {
  __declareSubApp,
  SubAppOptions,
  envHooks,
  SubAppDef,
  SubAppContainer,
  PipelineFactoryParams
} from "../subapp/index";
import { SubAppServerRenderPipeline } from "./server-render-pipeline";
import { SSR_PIPELINES } from "./utils";

//
// re-exports
//
export * from "../subapp/index";
export * from "./types";
export * from "./xarc-subapp-v2-node";
export * from "./render-page";
export { loadSubApp } from "./load-v2";
export { initContext } from "./init-context";
export { initSubApp } from "./init-v2";
export { startSubApp } from "./start-v2";
export { SSR_PIPELINES } from "./utils";
export { SubAppServerRenderPipeline };
export { ClientRenderPipeline } from "../subapp/client-render-pipeline";

let CONTAINER: SubAppContainer;

/**
 * Get the subapp container
 *
 * @returns subapp container
 */
export function getContainer(): SubAppContainer {
  if (!CONTAINER) {
    CONTAINER = new SubAppContainer({});
  }

  return CONTAINER;
}

export function _clearContainer(): void {
  CONTAINER = undefined;
}

export function _setupEnvHooks() {
  if (!envHooks.getContainer) {
    envHooks.getContainer = getContainer;
  }
}

const serverOverrideMethods: Partial<SubAppDef> = {
  _start({ ssrData }) {
    const { request } = ssrData;
    const pipelines: SubAppServerRenderPipeline[] = request[SSR_PIPELINES];
    const pipeline = this._pipelineFactory({ ssrData });
    pipelines.push(pipeline);
    return pipeline.startPrepare();
  },

  /**
   * Server side render pipeline factory
   * @param params pipeline factory params
   * @returns subapp sever render pipeline object
   */
  _pipelineFactory(params: PipelineFactoryParams) {
    const { ssrData } = params;
    return new SubAppServerRenderPipeline(ssrData);
  }
};

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
  _setupEnvHooks();

  const def = __declareSubApp(options as SubAppDef, serverOverrideMethods);
  return def;
}

/**
 * boolean that indicate if app is running in the browser
 */
export const IS_BROWSER = false;

/**
 * Refresh all subapps modules by setting its loaded module to null
 * which will cause them to be reloaded when subAppReady is called.
 * ie: renderPage from @xarc/react will check and call subAppReady.
 *
 */
export function refreshAllSubApps2() {
  const container = getContainer();

  const subAppNames = container.getNames();

  for (const name of subAppNames) {
    container.get(name)._module = null;
  }

  container.updateReady();
}
