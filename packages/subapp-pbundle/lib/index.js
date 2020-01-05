"use strict";

const subappWeb = require("subapp-web");
const preact = require("preact");
const FrameworkLib = require("./framework-lib");
const { default: AppContext } = require("../browser/app-context");

const { h, Component, render } = preact;

subappWeb.setupFramework(FrameworkLib);

module.exports = {
  ...subappWeb,
  AppContext,
  FrameworkLib,
  preact,
  h,
  Component,
  render
};
