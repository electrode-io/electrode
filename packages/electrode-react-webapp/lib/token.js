"use strict";

/* eslint-disable no-magic-numbers, no-console */

const assert = require("assert");
const loadHandler = require("./load-handler");
const { TEMPLATE_DIR } = require("./symbols");

const viewTokenModules = {};

class Token {
  constructor(id, pos, props) {
    this.id = id;
    this.isModule = id.startsWith("#");
    this.pos = pos;
    this.custom = undefined;
    this.wantsNext = undefined;
    this.props = props || {};
    if (this.props._call) {
      this._modCall = [].concat(this.props._call);
    }
  }

  // if token is a module, then load it
  load(options) {
    if (!this.isModule) return;

    let tokenMod = viewTokenModules[this.id];

    if (tokenMod === undefined) {
      const mPath = this.id.substr(1); // remove the leading #
      tokenMod = loadHandler(mPath, this.props[TEMPLATE_DIR]);
      viewTokenModules[this.id] = tokenMod;
    }

    if (this._modCall) {
      // call setup function to get an instance
      const params = [options || {}, this].concat(this._modCall[1] || []);
      assert(
        tokenMod[this._modCall[0]],
        `electrode-react-webapp: _call of token ${this.id} - '${this._modCall[0]}' not found`
      );
      this.custom = tokenMod[this._modCall[0]].apply(undefined, params);
    } else {
      this.custom = tokenMod(options || {}, this);
    }

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
