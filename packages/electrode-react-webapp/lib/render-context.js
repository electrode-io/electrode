"use strict";

/* eslint-disable no-magic-numbers */

const RenderOutput = require("./render-output");
const Promise = require("bluebird");

class RenderContext {
  constructor($) {
    this.$ = $;
    this.output = new RenderOutput(this);
    this.tokenHandler = $.routeData.tokenHandler;
    this.userTokenHandler = $.routeData.userTokenHandler;
    this.content = $.content;
    this._tokens = $.routeData.htmlTokens;
    this._tokenIndex = 0;
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this._nextCb = () => this._next();
  }

  _handleResult(id, res) {
    // it's a promise, wait for it and call next
    if (res && res.then) {
      res.then(this._nextCb).catch(err => {
        console.log(`token process for ${id} failed`, err); // eslint-disable-line
        this._next();
      });
      return;
    }

    // it's a string, add to output
    if (typeof res === "string") {
      this.output.add(res);
    }

    // ignore other return value types
    this._next();
  }

  _getTokenHandler(id) {
    if (this.userTokenHandler) {
      const x = this.userTokenHandler[id];
      if (x) return x;
    }

    return this.tokenHandler[id];
  }

  _next() {
    const tokens = this._tokens;
    if (this._tokenIndex >= tokens.length) {
      this._resolve(this.output.close());
      return;
    }

    const tk = tokens[this._tokenIndex];
    this._tokenIndex++;

    if (tk.str !== undefined) {
      this.output.add(tk.str);
      this._next();
    } else if (tk.isModule === false) {
      const handler = this._getTokenHandler(tk.id);
      if (handler.length > 1) {
        handler(this, this._nextCb);
      } else {
        this._handleResult(tk.id, handler(this));
      }
    } else if (tk.wantsNext === true) {
      tk.process(this, this._nextCb);
    } else {
      this._handleResult(tk.id, tk.process(this));
    }
  }

  render() {
    this._tokenIndex = 0;
    this._next();
    return this._promise;
  }
}

module.exports = RenderContext;
