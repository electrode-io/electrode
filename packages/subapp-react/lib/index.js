"use strict";

const subappWeb = require("subapp-web");
const React = require("react");
const FrameworkLib = require("./framework-lib");
const { default: AppContext } = require("../dist/node/app-context");

subappWeb.setupFramework(FrameworkLib);

module.exports = {
  ...subappWeb,
  AppContext,
  FrameworkLib,
  React
};
