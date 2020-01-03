"use strict";

const subappWeb = require("subapp-web");

const { default: AppContext } = require("../browser/app-context");

subappWeb.setupFramework(require("./framework-lib"));

module.exports = {
  ...subappWeb,
  AppContext,
  React: require("react")
};
