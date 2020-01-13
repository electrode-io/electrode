"use strict";

/* eslint-disable global-require */

const { registerSubApp } = require("subapp-util");

const { default: makeSubAppSpec } = require("../node-dist/make-subapp-spec");

const { setupFramework } = require("./util");

module.exports = {
  // isomorphic functions
  loadSubApp(spec) {
    return registerSubApp(makeSubAppSpec(spec));
  },

  setupFramework,

  // dynamic load subapp is only for client side
  dynamicLoadSubApp: () => {},
  getBrowserHistory: () => undefined,

  // server side template token processing modules

  init: require("./init"),
  load: require("./load"),
  start: require("./start")
};
