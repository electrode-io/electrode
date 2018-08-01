"use strict";

/* eslint-disable max-statements */

const Promise = require("bluebird");
const { VOID_STOP, FULL_STOP, SOFT_STOP } = require("./render-context");

class Renderer {
  constructor(options) {
    // the last handler wins if it contains a token
    const tokenHandlers = options.tokenHandlers.reverse();

    const makeStep = tk => {
      // token is a literal string, just add it to output
      if (tk.str !== undefined) {
        return xt => {
          xt.context.output.add(tk.str);
          this._next(xt);
        };
      }

      // token is not pointing to a module, so use it as an id to lookup from token handlers
      if (!tk.isModule) {
        // look for first handler that has a token function for tk.id
        const handler = tokenHandlers.find(h => h.tokens.hasOwnProperty(tk.id));

        // no handler has function for token
        if (!handler) {
          const msg = `electrode-react-webapp: no handler found for token id ${tk.id}`;
          console.log(msg); // eslint-disable-line
          return xt => {
            xt.context.output.add(`<!-- unhandled token ${tk.id} -->`);
            this._next(xt);
          };
        }

        const tkFunc = handler.tokens[tk.id];

        // not a function, just add it to output
        if (typeof tkFunc !== "function") {
          return xt => {
            xt.context.output.add(tkFunc);
            this._next(xt);
          };
        }

        // token function takes more than one argument, so pass in a callback for async
        if (tkFunc.length > 1) {
          return xt => tkFunc.call(tk, xt.context, () => this._next(xt));
        }

        // token function is sync or returns Promise, so pass its return value
        // to context.handleTokenResult
        return xt =>
          xt.context.handleTokenResult(tk.id, tkFunc.call(tk, xt.context), () => this._next(xt));
      }

      // token is a module and its process function wants a next callback
      if (tk.wantsNext === true) {
        return xt => tk.process(xt.context, () => this._next(xt));
      }

      // token is a module and its process function is sync so pass its
      // return value to context.handleTokenResult
      return xt =>
        xt.context.handleTokenResult(tk.id, tk.process(xt.context), () => this._next(xt));
    };

    this.renderSteps = options.htmlTokens.map(makeStep);
  }

  render(context) {
    return new Promise((resolve, reject) =>
      this._next({ context, _tokenIndex: 0, resolve, reject })
    );
  }

  _next(xt) {
    const stop = xt.context.stop;

    if (stop === VOID_STOP || stop === FULL_STOP || xt._tokenIndex >= this.renderSteps.length) {
      return xt.resolve(xt.context.output.close());
    } else if (stop === SOFT_STOP) {
      return false; // TODO: support soft stop
    } else {
      return this.renderSteps[xt._tokenIndex++](xt);
    }
  }
}

module.exports = Renderer;
