/* eslint-disable no-console, no-return-assign, prefer-const, prefer-spread, prefer-rest-params */
/* eslint-env browser */
/* global globalThis */
/**
 * SubApp client side shell version 2
 */

import {
  LoadSubAppOptions,
  SubAppDef,
  SubAppStartOptions,
  XarcSubAppClientV2
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
      _subapps?: Record<string, SubAppDef>;
    }
) {
  if (!w._wml) {
    w._wml = {};
  }

  const version = 2000000; // ###.###.### major.minor.patch

  if (w.xarcV2 && w.xarcV2.version >= version) return w.xarcV2;

  const runtimeInfo = {
    instId: 1,
    subApps: {},
    bundles: {},
    onLoadStart: {},
    groups: {},
    started: false
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

      const group = options.group;
      if (group) {
        let groupInfo = runtimeInfo.groups[group];
        if (!groupInfo) {
          groupInfo = runtimeInfo.groups[group] = { group: group, total: 0, queue: [] };
        }
        groupInfo.total++;
      }

      ols[name].push(Object.assign({}, options, data));
    },

    _start(ignore: string[] = []) {
      runtimeInfo.started = true;
      const promises = [];
      const onLoadStart = runtimeInfo.onLoadStart;
      const subappsBeforeLoad = Object.keys(w._subapps);

      const subapps = w._subapps;

      const beginTs = Date.now();
      for (const name in onLoadStart) {
        if (!subapps[name]._module) {
          promises.push(subapps[name]._getModule());
        }
      }

      if (ignore.length > 0) {
        for (const name in subapps) {
          const sa = subapps[name];
          if (ignore.indexOf(name) < 0 && !sa._module && sa._ssr) {
            console.debug(" -> loading module of new SSR subapp declared", name, sa._ssr);
            promises.push(subapps[name]._getModule());
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
          // Some modules declared more subapps, load them first.
          if (Object.keys(subapps).length > subappsBeforeLoad.length) {
            console.debug("new subapps declared => loading them");
            return this._start(subappsBeforeLoad);
          }
          const doc: Document = w.document;
          for (const name in onLoadStart) {
            onLoadStart[name].forEach((startOpts: SubAppStartOptions) => {
              const element = doc.getElementById(startOpts.elementId || `subapp2-${name}`);
              console.debug(name, "starting subapp into", element);
              w._subapps[name]._start(Object.assign({}, startOpts, { element }));
            });
          }
          return mods;
        });
    },

    start() {
      console.log("xarcV2 start, version:", version);
      if (!w._subapps) {
        console.error("No subapps registered, nothing to start.");
        return Promise.resolve();
      }
      return this._start();
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

    debug() {
      console.debug.apply(console, Array.prototype.slice.call(arguments));
    }
  });
}
