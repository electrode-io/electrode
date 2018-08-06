"use strict";

const Promise = require("bluebird");

const { TOKEN_HANDLER } = require("./symbols");

const executeSteps = {
  STEP_HANDLER: 0,
  STEP_STR_TOKEN: 1,
  STEP_NO_HANDLER: 2,
  STEP_LITERAL_HANDLER: 3
};

const { STEP_HANDLER, STEP_STR_TOKEN, STEP_NO_HANDLER, STEP_LITERAL_HANDLER } = executeSteps;

function renderNext(err, xt) {
  const { renderSteps, context } = xt;
  if (err) {
    // debugger; // eslint-disable-line
    context.handleError(err);
  }

  if (context.isFullStop || context.isVoidStop || xt.stepIndex >= renderSteps.length) {
    return xt.resolve(context.output.close());
  } else {
    // TODO: support soft stop
    const step = renderSteps[xt.stepIndex++];
    const tk = step.tk;
    switch (step.code) {
      case STEP_HANDLER:
        return context.handleTokenResult(tk.id, tk[TOKEN_HANDLER](context, tk), e =>
          renderNext(e, xt)
        );
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
    return renderNext(null, xt);
  }
}

function executeRenderSteps(renderSteps, context) {
  return new Promise(resolve => {
    const xt = { stepIndex: 0, renderSteps, context, resolve };
    renderNext(null, xt);
  });
}

module.exports = { executeRenderSteps, renderNext, executeSteps };
