/* eslint-disable complexity */

import { TOKEN_HANDLER } from "@xarc/render-context";

const executeSteps = {
  STEP_HANDLER: 0,
  STEP_STR_TOKEN: 1,
  STEP_NO_HANDLER: 2,
  STEP_LITERAL_HANDLER: 3
};

const { STEP_HANDLER, STEP_STR_TOKEN, STEP_NO_HANDLER, STEP_LITERAL_HANDLER } = executeSteps;

function renderNext(err: Error, xt) {
  const { renderSteps, context } = xt;
  if (err) {
    context.handleError(err);
  }

  const insertTokenId = tk => {
    context.output.add(`<!-- BEGIN ${tk.id} props: ${JSON.stringify(tk.props)} -->\n`);
  };

  const insertTokenIdEnd = tk => {
    context.output.add(`<!-- ${tk.id} END -->\n`);
  };

  if (context.isFullStop || context.isVoidStop || xt.stepIndex >= renderSteps.length) {
    const r = context.output.close();
    xt.resolve(r);
    return null;
  } else {
    // TODO: support soft stop
    const step = renderSteps[xt.stepIndex++];
    const tk = step.tk;
    const withId = step.insertTokenId;
    switch (step.code) {
      case STEP_HANDLER:
        if (withId) insertTokenId(tk);
        return context.handleTokenResult(tk.id, tk[TOKEN_HANDLER](context, tk), e => {
          if (withId) insertTokenIdEnd(tk);
          return renderNext(e, xt);
        });
      case STEP_STR_TOKEN:
        context.output.add(tk.str);
        break;
      case STEP_NO_HANDLER:
        context.output.add(`<!-- unhandled token ${tk.id} -->`);
        break;
      case STEP_LITERAL_HANDLER:
        if (withId) insertTokenId(tk);
        context.output.add(step.data);
        if (withId) insertTokenIdEnd(tk);
        break;
    }
    return renderNext(null, xt);
  }
}

function executeRenderSteps(renderSteps, context) {
  return new Promise(resolve => {
    const xt = { stepIndex: 0, renderSteps, context, resolve };
    return renderNext(null, xt);
  });
}

const RenderExecute = { executeRenderSteps, renderNext, executeSteps };
export default RenderExecute;
