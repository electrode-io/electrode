/** @ignore */ /** */

/* eslint-disable no-magic-numbers, no-console, max-params, max-statements */
/* eslint-disable comma-dangle, arrow-parens, filenames/match-regex */

import * as assert from "assert";
import { loadTokenModuleHandler } from "./load-handler";
import { TEMPLATE_DIR, TOKEN_HANDLER } from "./symbols";
const viewTokenModules = {};
export class TokenModule {
  id: any;
  modPath: any;
  isModule: any;
  pos: any;
  custom: any;
  wantsNext: any;
  props: any;
  _modCall: any;

  constructor(id, pos, props, templateDir) {
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
    this[TEMPLATE_DIR] = this.props[TEMPLATE_DIR] || templateDir || process.cwd();
  }

  // if token is a module, then load it
  load(options = {}) {
    if (!this.isModule || this.custom !== undefined) return;
    let tokenMod = viewTokenModules[this.id];

    if (tokenMod === undefined) {
      if (this._modCall) {
        tokenMod = loadTokenModuleHandler(this.modPath, this[TEMPLATE_DIR], this._modCall[0]);
      } else {
        tokenMod = loadTokenModuleHandler(this.modPath, this[TEMPLATE_DIR]);
      }
      viewTokenModules[this.id] = tokenMod;
    }
    if (this._modCall) {
      // call setup function to get an instance
      const params = [options, this].concat(this._modCall[1] || []);
      assert(
        tokenMod[this._modCall[0]],
        `electrode-react-webapp: _call of token ${this.id} - '${this._modCall[0]}' not found`
      );
      this.custom = tokenMod[this._modCall[0]](...params);
    } else {
      this.custom = tokenMod(options, this);
    }

    /* if token doesn't provide any code (null) then there's no handler to set for it */
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
