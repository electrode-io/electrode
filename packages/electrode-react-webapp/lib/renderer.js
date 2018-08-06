"use strict";

const { executeSteps, executeRenderSteps } = require("./render-execute");

const {
  STEP_CALLBACK,
  STEP_MAYBE_ASYNC,
  STEP_STR_TOKEN,
  STEP_NO_HANDLER,
  STEP_LITERAL_HANDLER
} = executeSteps;

class Renderer {
  constructor(options) {
    // the last handler wins if it contains a token
    const tokenHandlers = options.tokenHandlers.reverse();

    const makeHandlerStep = tk => {
      // look for first handler that has a token function for tk.id
      const handler = tokenHandlers.find(h => h.tokens.hasOwnProperty(tk.id));

      // no handler has function for token
      if (!handler) {
        const msg = `electrode-react-webapp: no handler found for token id ${tk.id}`;
        console.error(msg); // eslint-disable-line
        return { tk, code: STEP_NO_HANDLER };
      }

      const tkFunc = handler.tokens[tk.id];

      if (tkFunc === null) {
        return null;
      }

      if (typeof tkFunc !== "function") {
        // not a function, just add it to output
        return { tk, code: STEP_LITERAL_HANDLER, data: tkFunc };
      }

      tk.setHandler(tkFunc);

      const code =
        tkFunc.length > 1 // token function takes more than one argument, so it takes callback
          ? STEP_CALLBACK
          : // token function is sync or returns Promise
            STEP_MAYBE_ASYNC;

      return { tk, code };
    };

    const makeStep = tk => {
      // token is a literal string, just add it to output
      if (tk.hasOwnProperty("str")) {
        return { tk, code: STEP_STR_TOKEN };
      }

      // token is not pointing to a module, so lookup from token handlers
      if (!tk.isModule) return makeHandlerStep(tk);

      const code =
        tk.wantsNext === true // module's process function wants a next callback
          ? STEP_CALLBACK
          : // module's process function is sync or returns Promise
            STEP_MAYBE_ASYNC;

      return { tk, code };
    };

    this.renderSteps = options.htmlTokens.map(makeStep).filter(x => x);
  }

  render(context) {
    return executeRenderSteps(this.renderSteps, context);
  }
}

module.exports = Renderer;
