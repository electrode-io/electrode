/* eslint-env browser */
/* eslint-disable no-console, @typescript-eslint/ban-ts-comment */
/* global window */

export * from "../subapp/index";

import {
  __declareSubApp,
  envHooks,
  SubAppContainer,
  SubAppOptions,
  SubAppDef,
  SubAppStartOptions,
  SubAppMountInfo,
  XarcSubAppClientV2
} from "../subapp/index";

/**
 * Get the subapp container
 *
 * @returns subapp container
 */
export function getContainer(): SubAppContainer {
  const w: any = window;

  if (!w._subapps) {
    w._subapps = new SubAppContainer({});
  }

  return w._subapps;
}

export const xarcV2 = ((window as any).xarcV2 as XarcSubAppClientV2) || {
  // in case xarc subapp client is not loaded, provide an empty fill-in to handle debug calls
  // this occurs when app is using subapp for dynamic import component only without the subapp features.
  debug: () => {
    //
  }
};

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
 *
 */

const _dynamics = [];

export function declareSubApp(options: SubAppOptions): SubAppDef {
  _setupEnvHooks();

  const def = __declareSubApp(options);

  //
  // Preload module so it's available ASAP.  This also ensure module is reloaded when
  // a module that HMR updated is re-declaring a subapp.
  //
  def._getModule();

  def._start = function (startOptions: SubAppStartOptions) {
    def._startOptions = startOptions;
    return def._frameworkFactory!().startSubApp(this, startOptions);
  };

  // In production build, webpack will replace module.hot with false and the code will be optimized out
  // @ts-ignore
  if (module.hot) {
    def._mount = (info: SubAppMountInfo) => {
      xarcV2.debug("subapp _mount for", def.name, info, info.component.constructor.name);
      if (info.component.constructor.name === "SubAppStartComponent") {
        def._startComponent = info.component;
      }
      if (_dynamics.indexOf(info) < 0) {
        _dynamics.push(info);
      }
    };

    def._unmount = (info: SubAppMountInfo) => {
      xarcV2.debug("subapp _unmount for", def.name, info, info.component.constructor.name);
      const ix = _dynamics.indexOf(info);
      if (ix >= 0) {
        _dynamics.splice(ix, 1);
      }
    };

    def._reload = function (subAppName: string, _modName?: string) {
      return def
        ._getModule()
        .then((m: any) => {
          return m.reload && m.reload("HMR");
        })
        .then(() => {
          if (def._startOptions) {
            if (def._startComponent) {
              xarcV2.debug("Reloading a subapp with its start component");
              // restart a rendered subapp
              setTimeout(() => def._startComponent.reload(def._module), 1);
            } else {
              return def._frameworkFactory!().startSubApp(this, def._startOptions, true);
            }
          }
          return null;
        })
        .then(() => {
          _dynamics.forEach(dyn => {
            if (dyn.subapp.name === subAppName) {
              dyn.component.reload(def._module);
            }
          });
        });
    };
  }

  return def;
}

export const IS_BROWSER = true;
