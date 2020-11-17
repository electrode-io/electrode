/* eslint-disable complexity, max-statements, max-params */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { TOKEN_HANDLER } from "@xarc/render-context";
import { TagTemplate } from "./tag-template";
import { TAG_TYPE } from "./symbols";

export const executeSteps = {
  STEP_HANDLER: 0,
  STEP_STR_TOKEN: 1,
  STEP_NO_HANDLER: 2,
  STEP_LITERAL_HANDLER: 3,
  STEP_FUNC_HANDLER: 4,
  STEP_SUB_TEMPLATE: 5
};

const {
  STEP_HANDLER,
  STEP_STR_TOKEN,
  STEP_NO_HANDLER,
  STEP_LITERAL_HANDLER,
  STEP_FUNC_HANDLER,
  STEP_SUB_TEMPLATE
} = executeSteps;

function handleSubTemplate(tkId: string, step, result: any, xt: any, cb: Function) {
  if (!result) {
    return cb();
  }

  const handle = res => {
    if (res[TAG_TYPE] && res[TAG_TYPE] === "template") {
      const step2 = xt.template.handleSubTemplate(step, res);
      return executeTagTemplate(step2.template, step2.tk, xt.context, true).then(cb, cb);
    } else {
      return xt.context.handleTokenResult(tkId, res, cb);
    }
  };

  if (result.then) {
    return result.then(handle, cb);
  } else {
    return handle(result);
  }
}
/**
 * Execute the next step for the token tags
 * @param err - error from previous step
 * @param xt - execution context
 *
 * @returns any - non-significant
 */
export function renderNext(err: Error, xt: any) {
  const { template, tagTokens, context } = xt;
  if (err) {
    context.handleError(err);
  }

  const insertTokenId = tk => {
    context.output.add(`<!-- BEGIN ${tk.id} props: ${JSON.stringify(tk.props)} -->\n`);
  };

  const insertTokenIdEnd = tk => {
    context.output.add(`<!-- ${tk.id} END -->\n`);
  };

  if (context.isFullStop || context.isVoidStop || xt.stepIndex >= tagTokens.length) {
    if (!xt.subTemplate) {
      xt.resolve(context.output.close());
    } else {
      xt.resolve();
    }
    return null;
  } else {
    const tagIndex = xt.stepIndex++;
    const tk = tagTokens[tagIndex];
    const step = template.getTagOpCode(tagIndex);

    if (!step) {
      return renderNext(null, xt);
    }

    // const tk = step.tk;
    const withId = step.insertTokenId;
    switch (step.code) {
      case STEP_SUB_TEMPLATE:
        return executeTagTemplate(step.template, step.tk, context, true).then(
          () => renderNext(null, xt),
          (err2: Error) => renderNext(err2, xt)
        );
      case STEP_FUNC_HANDLER: {
        const result = tk(context);
        // in case the function handler returned a sub template
        return handleSubTemplate("", step, result, xt, (e: Error) => renderNext(e, xt));
      }
      case STEP_HANDLER: {
        if (withId) {
          insertTokenId(tk);
        }
        const result = tk[TOKEN_HANDLER](context, tk);
        // in case the handler returned a sub template
        return handleSubTemplate(tk.id, step, result, xt, (e: Error) => {
          if (withId) {
            insertTokenIdEnd(tk);
          }
          return renderNext(e, xt);
        });
      }
      case STEP_STR_TOKEN:
        context.output.add(tk.str);
        break;
      case STEP_NO_HANDLER:
        context.output.add(`<!-- unhandled token ${tk.id} -->\n`);
        break;
      case STEP_LITERAL_HANDLER:
        if (withId) {
          insertTokenId(tk);
        }
        context.output.add(step.data);
        if (withId) {
          insertTokenIdEnd(tk);
        }
        break;
    }
    return renderNext(null, xt);
  }
}

export function executeTagTemplate(
  template: TagTemplate,
  tagTokens: any[],
  context,
  subTemplate = false
) {
  return new Promise(resolve => {
    const xt = { stepIndex: 0, template, tagTokens, context, resolve, subTemplate };
    return renderNext(null, xt);
  });
}
