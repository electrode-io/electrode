import { envHooks } from "./envhooks";

// let declareSubAppCount = 0;
// let readySubAppCount = 0;

/**
 * Check if subapps are ready for SSR.
 *
 * @returns boolean - indicate if subapps are ready
 */
export function isSubAppReady() {
  return envHooks.getContainer().isReady();
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
export function subAppReady(
  list: boolean | string[] = false,
  ignores: string[] = [],
  callDepth = 0
): Promise<any> {
  // not doing async/await to avoid ts transpiling them to non-promise ES5
  // https://github.com/microsoft/TypeScript/issues/31621

  const container = envHooks.getContainer();

  if (container.isReady()) {
    return Promise.resolve();
  }

  const toWait = container.getNames();

  const subappModules = [];

  for (const name of toWait) {
    if (
      ignores.indexOf(name) < 0 && // must use indexOf, because ts doesn't transpile .includes to ES5
      (list === true ||
        (Array.isArray(list) && list.indexOf(name) >= 0) ||
        container.get(name)._ssr)
    ) {
      subappModules.push(
        container
          .get(name)
          ._getModule()
          .then(() => name)
      );
    }
  }

  return Promise.all(subappModules)
    .then(results => {
      // if loading a subapp module triggered more subapps to be declared, then
      // need to ensure those are ready also.
      if (toWait.length !== container.declareCount) {
        if (callDepth < 15) {
          // just load all new subapps but ignore what's just loaded
          return subAppReady(true, toWait, callDepth + 1).then(res2 => results.concat(res2));
        } else {
          console.error("subapp ready call nesting too deep", callDepth); // eslint-disable-line no-console
        }
      }

      return results;
    })
    .catch(err => {
      console.error("get subapp module failure", err); // eslint-disable-line no-console
      return [];
    });
}
