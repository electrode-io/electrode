"use strict";

const defaultsDeep = require("lodash/defaultsDeep");
const get = require("lodash/get");
const uiConfig = require("./ui-config");

const _config = {
  getCcm: function (request) {
    const store = get(request, "app.ccm._store", _config.server.app.ccm);
    return store || {};
  }
};

Object.defineProperty(_config, "_server", {
  set: (value) => {
    _config.server = value;
    const config = value.app && value.app.config || {};
    const mergedConfig = defaultsDeep({}, config.ssrUi, config.ui);
    Object.assign(_config, uiConfig({ui: mergedConfig}));
  }
});

Object.defineProperty(_config, "ccm", {
  get: () => {
    throw new Error("Getter property deprecated. Invoke uiConfig.getCcm(request) instead");
  }
});

module.exports = _config;
