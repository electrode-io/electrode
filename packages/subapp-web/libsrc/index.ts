import { registerSubApp } from "subapp-util";
import makeSubAppSpec from "../dist/node/make-subapp-spec";

import util from "./util";

// isomorphic functions
export function loadSubApp(spec) {
  return registerSubApp(makeSubAppSpec(spec));
};

export const setupFramework = util.setupFramework;

// lazy load subapp is only for client side
export const lazyLoadSubApp = () => {};

export const dynamicLoadSubApp = lazyLoadSubApp;

export const getBrowserHistory = () => undefined;

// server side template token processing modules

export { setup as polyfill } from "./polyfill";
export { setup as init } from "./init";
export { setup as load } from "./load";
export { setup as start } from "./start";
export { ReserveSpot } from "./ReserveSpot";

export const xarc = { IS_BROWSER: false, HAS_WINDOW: false } // no xarc client lib on the server
