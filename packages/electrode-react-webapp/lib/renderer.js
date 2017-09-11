"use strict";

const Promise = require("bluebird");

class Renderer {
  constructor(options) {
    const makeStep = tk => {
      if (tk.str !== undefined) {
        return xt => {
          xt.context.output.add(tk.str);
          this._next(xt);
        };
      } else if (!tk.isModule) {
        const handler = options.tokenHandlers.find(h => h.hasOwnProperty(tk.id))[tk.id];
        if (handler.length > 1) {
          return xt => handler(xt.context, () => this._next(xt));
        } else {
          return xt => xt.context.handleResult(tk.id, handler(xt.context), () => this._next(xt));
        }
      } else if (tk.wantsNext === true) {
        return xt => tk.process(xt.context, () => this._next(xt));
      } else {
        return xt => xt.context.handleResult(tk.id, tk.process(xt.context), () => this._next(xt));
      }
    };

    this.renderSteps = options.htmlTokens.map(makeStep);
  }

  render(context) {
    return new Promise((resolve, reject) =>
      this._next({ context, _tokenIndex: 0, resolve, reject })
    );
  }

  _next(xt) {
    return xt._tokenIndex >= this.renderSteps.length
      ? xt.resolve(xt.context.output.close())
      : this.renderSteps[xt._tokenIndex++](xt);
  }
}

module.exports = Renderer;
