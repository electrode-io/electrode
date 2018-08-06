"use strict";

const Promise = require("bluebird");

const { TOKEN_HANDLER } = require("./symbols");

const executeSteps = {
  STEP_CALLBACK: 0,
  STEP_MAYBE_ASYNC: 1,
  STEP_STR_TOKEN: 2,
  STEP_NO_HANDLER: 3,
  STEP_LITERAL_HANDLER: 4
};

const {
  STEP_CALLBACK,
  STEP_MAYBE_ASYNC,
  STEP_STR_TOKEN,
  STEP_NO_HANDLER,
  STEP_LITERAL_HANDLER
} = executeSteps;

function renderNext(err, xt) {
  const { renderSteps, context } = xt;
  if (err) {
    // debugger; // eslint-disable-line
    context.handleError(err);
  }

  if (context.isFullStop || context.isVoidStop || xt.stepIndex >= renderSteps.length) {
    xt.next = undefined;
    return xt.resolve(context.output.close());
  } else {
    // TODO: support soft stop
    const step = renderSteps[xt.stepIndex++];
    const tk = step.tk;
    switch (step.code) {
      case STEP_CALLBACK:
        return tk[TOKEN_HANDLER](context, xt.next);
      case STEP_MAYBE_ASYNC:
        return context.handleTokenResult(tk.id, tk[TOKEN_HANDLER](context), xt.next);
      case STEP_STR_TOKEN:
        context.output.add(tk.str);
        break;
      case STEP_NO_HANDLER:
        context.output.add(`<!-- unhandled token ${tk.id} -->`);
        break;
      case STEP_LITERAL_HANDLER:
        context.output.add(step.data);
        break;
    }
    return xt.next();
  }
}

function executeRenderSteps(renderSteps, context) {
  return new Promise(resolve => {
    const xt = { stepIndex: 0, renderSteps, context, resolve };
    xt.next = err => renderNext(err, xt);
    xt.next();
  });
}

module.exports = { executeRenderSteps, renderNext, executeSteps };
