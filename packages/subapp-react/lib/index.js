"use strict";

const subappWeb = require("subapp-web");
const React = require("react");

const { default: AppContext } = require("../browser/app-context");

subappWeb.setupFramework(require("./framework-lib"));

module.exports = {
  ...subappWeb,
  AppContext,
  React
};
