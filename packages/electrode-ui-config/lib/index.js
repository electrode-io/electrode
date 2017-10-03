"use strict";

const defaultsDeep = require("lodash/defaultsDeep");
const uiConfig = require("../dist/ui-config");

const _config = {};

Object.defineProperty(_config, "config", {
  set: config => {
    const mergedConfig = defaultsDeep({}, config.ssrUi, config.ui);
    Object.assign(_config, uiConfig({ ui: mergedConfig }));
  }
});

module.exports = _config;
