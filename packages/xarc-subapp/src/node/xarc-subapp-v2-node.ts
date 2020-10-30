/* eslint-disable */
/**
 * SubApp client side shell version 2
 */

import { XarcSubAppClientV2, LoadSubAppOptions } from "../subapp/index";

export const xarcV2: Partial<XarcSubAppClientV2> = {
  IS_BROWSER: false,
  HAS_WINDOW: false,

  version: 2000000,

  rt: {},

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

  _start(ignore: string[] = []) {
    return Promise.resolve();
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
  xarcV2.debug = function xarcV2Debug(...args) {
    console.log(...args);
  };
}
