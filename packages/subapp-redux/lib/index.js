"use strict";

const { registerSubApp } = require("subapp-util");

const shared = require("../dist/shared");

module.exports = {
  reduxLoadSubApp: subapp => {
    const extras = {
      __redux: true
    };

    if (!subapp.reduxCreateStore) {
      extras._genReduxCreateStore = "subapp";
      extras.reduxCreateStore = shared.getReduxCreateStore(subapp);
    }

    return registerSubApp(Object.assign(extras, subapp));
  }
};
