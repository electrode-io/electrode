"use strict";

/* eslint-disable no-magic-numbers, no-console */

const assert = require("assert");
const loadHandler = require("./load-handler");
const { TEMPLATE_DIR, TOKEN_HANDLER } = require("./symbols");

const viewTokenModules = {};

class Token {
  constructor(id, pos, props) {
    this.id = id;

    // match `require(path/to/module)`
    const match = id.match(/^require\(['"]?([^'"\)]+)['"]?\)/);
    if (match) {
      this.modPath = match[1];
      this.isModule = true;
    } else if (id.startsWith("#")) {
      this.modPath = this.id.substr(1); // remove the leading #
      this.isModule = true;
    } else {
      this.isModule = false;
    }

    this.pos = pos;
    this.custom = undefined;
    this.wantsNext = undefined;
    this.props = props || {};
    if (this.props._call) {
      this._modCall = [].concat(this.props._call);
    }
    this[TOKEN_HANDLER] = null;
  }

  // if token is a module, then load it
  load(options) {
    if (!this.isModule || this.custom !== undefined) return;

    let tokenMod = viewTokenModules[this.id];

    if (tokenMod === undefined) {
      tokenMod = loadHandler(this.modPath, this.props[TEMPLATE_DIR]);
      viewTokenModules[this.id] = tokenMod;
    }

    if (this._modCall) {
      // call setup function to get an instance
      const params = [options || {}, this].concat(this._modCall[1] || []);
      assert(
        tokenMod[this._modCall[0]],
        `electrode-react-webapp: _call of token ${this.id} - '${this._modCall[0]}' not found`
      );
      this.custom = tokenMod[this._modCall[0]](...params);
    } else {
      this.custom = tokenMod(options || {}, this);
    }

    if (this.custom === null) return;

    assert(
      this.custom && this.custom.process,
      `custom token ${this.id} module doesn't have process method`
    );

    // if process function takes more than one params, then it should take a
    // next callback so it can do async work, and call next after that's done.
    this.wantsNext = this.custom.process.length > 1;
    this.setHandler(context => this.custom.process(context, this));
  }

  setHandler(func) {
    this[TOKEN_HANDLER] = func;
  }
}

module.exports = Token;
