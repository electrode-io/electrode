"use strict";

/* eslint-disable global-require */

const { registerSubApp } = require("subapp-util");

const { default: makeSubAppSpec } = require("../dist/node/make-subapp-spec.js");

const { setupFramework } = require("./util");
const lazyLoadSubApp = () => {};
const ReserveSpot = require("./ReserveSpot");

module.exports = {
  // isomorphic functions
  loadSubApp(spec) {
    return registerSubApp(makeSubAppSpec(spec));
  },

  setupFramework,

  // lazy load subapp is only for client side
  lazyLoadSubApp,
  dynamicLoadSubApp: lazyLoadSubApp,

  getBrowserHistory: () => undefined,

  // server side template token processing modules

  polyfill: require("./polyfill"),
  init: require("./init"),
  load: require("./load"),
  start: require("./start"),
  ReserveSpot,
  xarc: { IS_BROWSER: false, HAS_WINDOW: false } // no xarc client lib on the server
};
