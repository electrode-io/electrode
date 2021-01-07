/* eslint-disable */
/**
 * SubApp client side shell version 2
 */

import { XarcSubAppClientV2, LoadSubAppOptions, _xarcV2RunTimeInfo } from "../subapp/index";

export const xarcV2: XarcSubAppClientV2 = {
  IS_BROWSER: false,
  HAS_WINDOW: false,

  version: 2000000,

  rt: {} as _xarcV2RunTimeInfo,

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

  getOnLoadStart(_name: string) {
    return [];
  },

  addOnLoadStart(name, load) {},

  startSubAppOnLoad(options: LoadSubAppOptions, data: any) {},

  _start(ignore: string[]) {
    return Promise.resolve(ignore);
  },

  start() {
    return this._start();
  },

  dyn(id) {
    return {};
  },

  /**
   * Need this for node.js.  While chrome dev tools allow setting console level, node.js'
   * console.debug is just an alias for console.log.
   */
  debug() {}
};

if (process.env.XARC_DEBUG) {
  Object.defineProperty(xarcV2, "debug", {
    get() {
      return console.log;
    }
  });
}
