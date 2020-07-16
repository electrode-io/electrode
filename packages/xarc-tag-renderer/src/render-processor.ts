/* eslint-disable max-statements */

import { executeRenderSteps, executeSteps } from "./render-execute";
import { TAG_TYPE } from "./symbols";
import { TokenModule } from "@xarc/render-context";

const {
  STEP_HANDLER,
  STEP_STR_TOKEN,
  STEP_NO_HANDLER,
  STEP_LITERAL_HANDLER,
  STEP_FUNC_HANDLER
} = executeSteps;

export class RenderProcessor {
  renderSteps: any;
  _options: any;
  _insertTokenIds: boolean;

  constructor(options) {
    this._options = options;
    this._insertTokenIds = Boolean(options.insertTokenIds);
    this.renderSteps = this.makeSteps(options.htmlTokens);
  }

  makeNullRemovedStep(tk, cause) {
    return {
      tk,
      insertTokenId: false,
      code: STEP_LITERAL_HANDLER,
      data: `<!-- ${tk.id} removed due to its ${cause} -->\n`
    };
  }

  makeHandlerStep(tk) {
    const options = this._options;
    const insertTokenIds = this._insertTokenIds;

    // look for first handler that has a token function for tk.id
    const tkFunc = options.asyncTemplate.lookupTokenHandler(tk);
    // no handler has function for token
    if (!tkFunc) {
      if (tkFunc === null) {
        if (insertTokenIds) {
          return this.makeNullRemovedStep(tk, "handler set to null");
        }
        return null;
      }

      const msg = `@xarc/tag-renderer: no handler found for token id ${tk.id}`;
      console.error(msg); // eslint-disable-line
      return { tk, code: STEP_NO_HANDLER };
    }

    if (typeof tkFunc !== "function") {
      // not a function, just add it to output
      return {
        tk,
        code: STEP_LITERAL_HANDLER,
        insertTokenId: insertTokenIds && !tk.props._noInsertId,
        data: tkFunc
      };
    }

    tk.setHandler(tkFunc);

    return { tk, code: STEP_HANDLER, insertTokenId: insertTokenIds && !tk.props._noInsertId };
  }

  makeStep(tk: any) {
    const options = this._options;
    const insertTokenIds = this._insertTokenIds;
    if (tk[TAG_TYPE] === "function") {
      return {
        tk,
        code: STEP_FUNC_HANDLER
      };
    }

    if (tk[TAG_TYPE] === "register-token-ids") {
      tk({ asyncTemplate: options.asyncTemplate });
      return null;
    }

    if (tk[TAG_TYPE] === "template") {
      return this.makeSteps(tk);
    }

    // token is a literal string, just add it to output
    if (tk.hasOwnProperty("str")) {
      return { tk, code: STEP_STR_TOKEN };
    }

    // token is not pointing to a module, so lookup from token handlers
    if (!tk.isModule) {
      return this.makeHandlerStep(tk);
    }

    if (tk.custom === null) {
      if (insertTokenIds) {
        return this.makeNullRemovedStep(tk, "process return null");
      }
      return null;
    }
    return {
      tk,
      code: STEP_HANDLER,
      insertTokenId: options.insertTokenIds && !tk.props._noInsertId
    };
  }

  makeSteps(tokens) {
    let steps = [];
    for (const htk of tokens) {
      const step = this.makeStep(htk);
      if (step) {
        steps = steps.concat(step);
      }
    }

    return steps;
  }

  render(context) {
    return executeRenderSteps(this.renderSteps, context);
  }
}
