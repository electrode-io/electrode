/* eslint-disable no-console, no-return-assign, prefer-const, prefer-spread, prefer-rest-params */
/* eslint-disable max-statements */
/* eslint-env browser */
/* global globalThis */
/**
 * SubApp client side shell version 2
 */

import {
  LoadSubAppOptions,
  SubAppContainer,
  SubAppCSRData,
  XarcSubAppClientV2,
  _xarcV2RunTimeInfo
} from "../subapp/index";

//
// all console.log and console.debug in this file will be optimized out for production
// Do not use xarcV2.debug in this file.
//

// xarc subapp client side lib version 2
// load into window.xarcV2 as a global
export function xarcV2Client(
  w: Window &
    typeof globalThis & {
      _wml?: any;
      xarcV2?: XarcSubAppClientV2;
      _subapps?: SubAppContainer;
    }
) {
  if (!w._wml) {
    w._wml = {};
  }

  let debugLog = () => {
    //
  };

  const version = 2000000; // ###.###.### major.minor.patch

  console.log("xarcV2 version", version);
  console.debug("xarcV2 debug log", (debugLog = console.debug));

  if (w.xarcV2 && w.xarcV2.version >= version) return w.xarcV2;

  const runtimeInfo: _xarcV2RunTimeInfo = {
    instId: 1,
    subApps: {},
    onLoadStart: {},
    started: false,
    md: {}
  };

  let xv2: XarcSubAppClientV2;

  return (w.xarcV2 = xv2 = {
    IS_BROWSER: true,
    HAS_WINDOW: typeof window !== "undefined",

    version,

    rt: runtimeInfo,

    //
    // empty place holders for CDN mapping
    //
    cdnInit(_: any) {
      //
    },
    cdnUpdate(_: any) {
      //
    },
    cdnMap(x) {
      return x;
    },

    getOnLoadStart(name) {
      if (!runtimeInfo.onLoadStart[name]) runtimeInfo.onLoadStart[name] = [];
      return runtimeInfo.onLoadStart[name];
    },

    addOnLoadStart(name, load) {
      xv2.getOnLoadStart(name).push(load);
    },

    //
    // When there are subapps that need to load and start up front, SSR could
    // be tricky if any of them is inlined within other components, because when
    // UI render the component tree, any kind of async op (such as data prep)
    // can't occur in the middle of the render and must return a fallback while
    // async is loading, and that would cause SSR content to be replaced with the
    // fallback, producing a flash, nullifying the SSR.
    // To remedy this, a single data prep action would be waiting for subapps
    // to load, all subapp that's starting onLoad will have to wait for the data prep
    // action.
    //
    // watchSubAppOnLoad(immediate) {},

    startSubAppOnLoad(options: LoadSubAppOptions, data: any) {
      const { name } = options;
      const ols = runtimeInfo.onLoadStart;

      if (!ols[name]) {
        ols[name] = [];
      }

      ols[name].push(Object.assign({}, options, data));
    },

    _start(ignore: string[], callDepth) {
      runtimeInfo.started = true;
      const promises = [];
      const onLoadStart = runtimeInfo.onLoadStart;
      const subapps = w._subapps;
      const subappsBeforeLoad = subapps.getNames();

      const beginTs = Date.now();
      for (const name in onLoadStart) {
        const subapp = subapps.get(name);
        if (!subapp) {
          console.debug("onload start subapp not yet registered:", name);
        } else if (!subapp._module) {
          promises.push(subapp._getModule());
        }
      }

      if (ignore.length > 0) {
        // some previously loaded subapps (in ignore) cause more subapps to be declared
        for (const name of subapps.getNames()) {
          const subapp = subapps.get(name);
          if (ignore.indexOf(name) < 0 && !subapp._module && subapp._ssr) {
            console.debug(" -> loading module of new SSR subapp declared", name, subapp._ssr);
            promises.push(subapp._getModule());
          }
        }
      }

      return Promise.all(promises)
        .catch(err => {
          console.error(
            "subapp onStart load modules failed. Continue anyways, but things may be broken.",
            err
          );
        })
        .then(mods => {
          console.debug("subapp onStart loaded modules. msec taken:", Date.now() - beginTs, mods);
          // Some modules declared more subapps, load them first, but ignore what we just loaded.
          if (subapps.declareCount > subappsBeforeLoad.length) {
            if (callDepth < 15) {
              console.debug("new subapps declared => loading them");
              return this._start(subappsBeforeLoad, callDepth + 1);
            } else {
              console.error("subapp _start callDepth too deep, giving up:", callDepth);
            }
          }
          const doc: Document = w.document;
          for (const name in onLoadStart) {
            onLoadStart[name].forEach((startOpts: SubAppCSRData) => {
              const element = doc.getElementById(startOpts.elementId || `subapp2-${name}`);
              console.debug(name, "starting subapp into", element);
              subapps.get(name)._start({ csrData: Object.assign({}, startOpts, { element }) });
            });
          }
          return mods;
        });
    },

    start() {
      if (!w._subapps) {
        console.error("No subapps registered, nothing to start.");
        return Promise.resolve();
      }
      return this._start([], 0);
    },

    dyn(id) {
      const msg = "ERROR: fail retrieve dynamic data from element";
      const element = document.getElementById(id);
      if (!element) {
        console.error(msg, id, "- get");
        return {};
      } else {
        try {
          return JSON.parse(element.innerHTML);
        } catch (err) {
          console.error(msg, id, "- parse");
          return {};
        }
      }
    },

    get debug() {
      return debugLog;
    }
  });
}
