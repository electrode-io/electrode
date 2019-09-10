"use strict";

/* eslint-disable global-require */

const { registerSubApp } = require("subapp-util");

const { default: makeSubAppSpec } = require("../browser/make-subapp-spec");

module.exports = {
  // isomorphic functions
  loadSubApp(spec) {
    return registerSubApp(makeSubAppSpec(spec));
  },
  // dynamic load subapp is only for client side
  dynamicLoadSubApp: () => {},
  getBrowserHistory: () => undefined,

  // server side template token processing modules

  init: require("./init"),
  load: require("./load"),
  start: require("./start")
};
