import {
  __declareSubApp,
  SubAppOptions,
  envHooks,
  SubAppDef,
  SubAppContainer
} from "../subapp/index";

//
// re-exports
//
export * from "../subapp/index";
export * from "./types";
export * from "./xarc-subapp-v2-node";
export { loadSubApp } from "./load-v2";
export { initSubApp } from "./init-v2";
export { startSubApp } from "./start-v2";

const CONTAINER: SubAppContainer = {};

let declareSubAppCount = 0;
let readySubAppCount = 0;

/**
 * Get the subapp container
 *
 * @returns subapp container
 */
export function getContainer(): SubAppContainer {
  return CONTAINER;
}

export function _setupEnvHooks() {
  if (!envHooks.getContainer) {
    envHooks.getContainer = getContainer;
  }
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
  _setupEnvHooks();
  declareSubAppCount++;
  const def = __declareSubApp(options as SubAppDef);
  return def;
}

/**
 * boolean that indicate if app is running in the browser
 */
export const IS_BROWSER = false;

export { SubAppServer } from "./subapp-server";

/**
 * Check if subapps are ready for SSR.
 *
 * @returns boolean - indicate if subapps are ready
 */
export function isSubAppReady() {
  return readySubAppCount === declareSubAppCount;
}

/**
 * Wait for subapps to be ready.
 *
 * - A subapp is awaited if one of the following is true
 *  1. It needs SSR
 *  2. The param `list` is `true`
 *  3. The param `list` is array of strings and contains the subapp's name.
 *
 * @param list - list of subapps' names to wait (if it's true, then wait for all)
 * @returns promise
 */
export async function subAppReady(list: boolean | string[] = false): Promise<any> {
  if (readySubAppCount === declareSubAppCount) {
    return;
  }

  const beforeWaitCount = declareSubAppCount;

  const container = envHooks.getContainer();
  const subappModules = [];

  for (const x in container) {
    if (list === true || (Array.isArray(list) && list.indexOf(x) >= 0) || container[x]._ssr) {
      subappModules.push(container[x]._getModule());
    }
  }

  await Promise.all(subappModules);

  readySubAppCount = beforeWaitCount;

  // if loading a subapp module triggered more subapps to be declared, then
  // need to ensure those are ready also.
  if (beforeWaitCount !== declareSubAppCount) {
    await subAppReady();
  }
}

/**
 * Refresh all subapps modules by setting its loaded module to null
 * which will cause them to be reloaded when subAppReady is called.
 * ie: renderPage from @xarc/react will check and call subAppReady.
 *
 */
export function refreshAllSubApps2() {
  const container = getContainer();

  for (const name in container) {
    container[name]._module = null;
  }

  readySubAppCount = -1;
}
