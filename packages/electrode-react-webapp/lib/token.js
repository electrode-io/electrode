"use strict";

/* eslint-disable no-magic-numbers, no-console */

const assert = require("assert");
const loadHandler = require("./load-handler");

const viewTokenModules = {};

class Token {
  constructor(id, pos, props) {
    this.id = id;
    this.isModule = id.startsWith("#");
    this.pos = pos;
    this.custom = undefined;
    this.wantsNext = undefined;
    this.props = props || {};
  }

  // if token is a module, then load it
  load(options) {
    if (!this.isModule) return;

    let tokenMod = viewTokenModules[this.id];

    if (tokenMod === undefined) {
      const mPath = this.id.substr(1); // remove the leading #
      tokenMod = loadHandler(mPath);
      viewTokenModules[this.id] = tokenMod;
    }

    this.custom = tokenMod(options || {}); // call setup function to get an instance
    assert(
      this.custom && this.custom.process,
      `custom token ${this.id} module doesn't have process method`
    );

    // if process function takes more than one params, then it should take a
    // next callback so it can do async work, and call next after that's done.
    this.wantsNext = this.custom.process.length > 1;
  }

  process(context, next) {
    assert(this.isModule, "Only token module can process");
    assert(this.custom, "Custom token is not loaded yet");
    return this.custom.process(context, next);
  }
}

module.exports = Token;
