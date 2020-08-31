"use strict";

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

export const polyfill = require("./polyfill");
export const init = require("./init");
export const load = require("./load");
export const start = require("./start");
export const ReserveSpot = require("./ReserveSpot");

export const xarc = { IS_BROWSER: false, HAS_WINDOW: false } // no xarc client lib on the server

