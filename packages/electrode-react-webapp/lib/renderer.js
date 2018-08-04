"use strict";

/* eslint-disable max-statements */

const Promise = require("bluebird");

class Renderer {
  constructor(options) {
    // the last handler wins if it contains a token
    const tokenHandlers = options.tokenHandlers.reverse();

    const makeStep = tk => {
      // token is a literal string, just add it to output
      if (tk.str !== undefined) {
        return xt => {
          xt.context.output.add(tk.str);
          this._next(null, xt);
        };
      }

      // token is not pointing to a module, so use it as an id to lookup from token handlers
      if (!tk.isModule) {
        // look for first handler that has a token function for tk.id
        const handler = tokenHandlers.find(h => h.tokens.hasOwnProperty(tk.id));

        // no handler has function for token
        if (!handler) {
          const msg = `electrode-react-webapp: no handler found for token id ${tk.id}`;
          console.error(msg); // eslint-disable-line
          return xt => {
            xt.context.output.add(`<!-- unhandled token ${tk.id} -->`);
            this._next(null, xt);
          };
        }

        const tkFunc = handler.tokens[tk.id];

        if (tkFunc === null) {
          return null;
        }

        // not a function, just add it to output
        if (typeof tkFunc !== "function") {
          return xt => {
            xt.context.output.add(tkFunc);
            this._next(null, xt);
          };
        }

        // token function takes more than one argument, so pass in a callback for async
        if (tkFunc.length > 1) {
          return xt => tkFunc.call(tk, xt.context, err => this._next(err, xt));
        }

        // token function is sync or returns Promise, so pass its return value
        // to context.handleTokenResult
        return xt =>
          xt.context.handleTokenResult(tk.id, tkFunc.call(tk, xt.context), err =>
            this._next(err, xt)
          );
      }

      // token is a module and its process function wants a next callback
      if (tk.wantsNext === true) {
        return xt => tk.process(xt.context, err => this._next(err, xt));
      }

      // token is a module and its process function is sync so pass its
      // return value to context.handleTokenResult
      return xt =>
        xt.context.handleTokenResult(tk.id, tk.process(xt.context), err => this._next(err, xt));
    };

    this.renderSteps = options.htmlTokens
      .map(tk => ({ tk, exec: makeStep(tk) }))
      .filter(x => x.exec);
  }

  render(context) {
    return new Promise((resolve, reject) =>
      this._next(null, { context, _tokenIndex: 0, resolve, reject })
    );
  }

  _next(err, xt) {
    if (err) {
      // debugger; // eslint-disable-line
      xt.context.handleError(err);
    }

    if (
      xt.context.isFullStop ||
      xt.context.isVoidStop ||
      xt._tokenIndex >= this.renderSteps.length
    ) {
      return xt.resolve(xt.context.output.close());
    } else {
      // TODO: support soft stop
      const step = this.renderSteps[xt._tokenIndex++];
      return step.exec(xt);
    }
  }
}

module.exports = Renderer;
