/* eslint-disable no-console, @typescript-eslint/no-empty-function */

export type ReloadFunction = (modName: string, subAppNames: string[]) => void;

/**
 * Code for injecting into subapp declaring JS module to enable hot module reloading
 *
 * The code will use webpack's module.hot.accept API to add acceptance hook for
 * a import JS module.
 *
 * The webpack plugin in plugins/subapp-plugin.ts will inject this code when it detect
 * a JS module declares subapps.
 *
 * @remarks the plugin will use the code from `toString` of this function to inject the
 * code, so this function cannot have any external dependencies.
 *
 * @param w - the window object
 * @param hot - webpack's module.hot API
 * @param reload - the function to call to reload a module
 */
export function hmrSetup(w: any, hot: any, reload?: ReloadFunction) {
  const inject: any = {};

  if (!hot) {
    console.log("HMR accept - hot module reload not enabled");
    inject.addSubApp = () => {};
    return inject;
  }

  const subAppModules = {};

  if (!reload) {
    reload = (modName: string, subAppNames: string[]) => {
      for (const subAppName of subAppNames) {
        const subapp = w._subapps && w._subapps[subAppName];
        if (subapp && subapp._reload) {
          subapp._reload(subAppName, modName);
        }
      }
    };
  }

  const accepter = outdated => {
    console.debug("xarc subapp2 HMR accept outdated modules:", outdated);
    for (const modName of outdated) {
      reload(modName, subAppModules[modName]);
    }
  };

  const accept = (modNames: string[]) => {
    hot.accept(modNames, accepter);
  };

  setTimeout(() => {
    accept(Object.keys(subAppModules));
  }, 0);

  inject.addSubApp = (modName: string, subAppName: string) => {
    let y = subAppModules[modName];
    if (!y) {
      y = subAppModules[modName] = [];
    }
    if (y.indexOf(subAppName) < 0) {
      y.push(subAppName);
    }
  };

  return inject;
}
