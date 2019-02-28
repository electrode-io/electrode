"use strict";

/* eslint-disable global-require */

const { registerSubApp } = require("subapp-util");

module.exports = {
  // isomorphic functions
  loadSubApp: registerSubApp,
  // dynamic load subapp is only for client side
  dynamicLoadSubApp: () => {},
  getBrowserHistory: () => undefined,

  // server side template token processing modules

  init: require("./init"),
  load: require("./load"),
  start: require("./start")
};
