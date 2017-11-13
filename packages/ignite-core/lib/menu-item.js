"use strict";

const EventEmitter = require("events");
const _ = require("lodash");

class MenuItem extends EventEmitter {
  constructor(options) {
    super();
    const OPTION_KEYS = ["icon", "menuText", "execute", "spinnerTitle", "cliCmd", "noPause"];
    Object.assign(this, _.pick(options, OPTION_KEYS));
  }
}

module.exports = MenuItem;
