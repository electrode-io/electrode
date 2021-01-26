/* eslint-disable no-console */
/* eslint-env browser */
/* global globalThis */

import { XarcSubAppClientV2, CDNData } from "../subapp/index";

/**
 * add CDN mapping support to xarc subapp client side lib
 *
 * @param w window object
 */
export function xarcCdnMap(
  w: Window &
    typeof globalThis & {
      _wml?: any;
      xarcV2?: XarcSubAppClientV2;
    }
) {
  const xv2 = w.xarcV2;
  if (!xv2) return;

  // cdnUpdate({md: {}}) - add mapping data to the CDN mapping resource
  xv2.cdnUpdate = (data: CDNData, replace: boolean) => {
    const md = data.md;
    for (const k in md) {
      if (xv2.rt.md[k] && !replace) {
        console.error("replace falsy but CDN map already exist:", k);
      } else {
        xv2.rt.md[k] = md[k];
      }
    }
  };

  // cdnMap(key) - lookup CDN URL for key in the mapping
  const baseName = (file: string) => {
    const ix = file.lastIndexOf("/");
    return ix >= 0 ? file.substr(ix + 1) : file;
  };

  xv2.cdnMap = (file: string) => {
    const reqBase = baseName(file);
    for (const k in xv2.rt.md) {
      if (baseName(k) === reqBase) {
        return xv2.rt.md[k];
      }
    }
    return console.error("CDN map not found:", file);
  };

  // compatible with window._wml.cdn
  if (!w._wml) {
    w._wml = {};
  }

  w._wml.cdn = {
    map: xv2.cdnMap,
    update: xv2.cdnUpdate
  };

  xv2.cdnInit = data => {
    w._wml.cdn.md = xv2.rt.md = data.md;
  };

  // initialize CDN assets
  xv2.cdnInit({ md: {} });
}
