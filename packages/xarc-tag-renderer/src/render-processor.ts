/* eslint-disable max-statements, complexity */

import { executeTagTemplate, executeSteps } from "./render-execute";
import { TAG_TYPE } from "./symbols";
import { createTemplateTagsFromArray, TagTemplate } from "./tag-template";
import { RenderContext } from "@xarc/render-context";
import { TagRenderer } from "./tag-renderer";

const {
  STEP_HANDLER,
  STEP_STR_TOKEN,
  STEP_NO_HANDLER,
  STEP_LITERAL_HANDLER,
  STEP_FUNC_HANDLER,
  STEP_SUB_TEMPLATE
} = executeSteps;

export class RenderProcessor {
  _options: any;
  _insertTokenIds: boolean;
  _renderer: TagRenderer;

  constructor(options: {
    /** Add debugging comment to rendered output with token IDs */
    insertTokenIds?: boolean;
    /** The renderer instance */
    asyncTemplate?: any;
  }) {
    this._options = options;
    this._insertTokenIds = Boolean(options.insertTokenIds);
    this._renderer = options.asyncTemplate;
  }

  applyTokenModuleLoad(options, template: TagTemplate) {
    for (const tokenModule of template._templateTags) {
      if (typeof tokenModule?.load === "function") {
        tokenModule.load({ ...this._renderer._handlerContext, ...options });
      }
    }
  }

  /**
   * Generate an exec step for a tag that has a null handler
   *
   * @param tk - tag
   * @param cause - reason a null handler is needed
   */
  makeNullRemovedStep(tk: any, cause: string) {
    return {
      tk,
      insertTokenId: false,
      code: STEP_LITERAL_HANDLER,
      data: `<!-- ${tk.id} removed due to its ${cause} -->\n`
    };
  }

  /**
   * Make a execution step for a token with a handler
   *
   * @param tk
   */
  makeHandlerStep(tk: any) {
    const insertTokenIds = this._insertTokenIds;

    // look for first handler that has a token function for tk.id
    const tkFunc = this._renderer.lookupTokenHandler(tk);
    // no handler has function for token
    if (!tkFunc) {
      if (tkFunc === null) {
        if (insertTokenIds) {
          return this.makeNullRemovedStep(tk, "handler set to null");
        }
        return null;
      }

      const msg = `@xarc/tag-renderer: no handler found for token id ${tk.id}`;
      return { tk, msg, code: STEP_NO_HANDLER };
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

  /**
   * Make a execution step for a token tag
   * @param tk - token tag
   * @returns execution step
   */
  makeStep(tk: any) {
    let opCode;

    const options = this._options;
    const insertTokenIds = this._insertTokenIds;

    if (!tk) {
      opCode = null;
    } else if (tk[TAG_TYPE] === "function") {
      opCode = {
        tk,
        code: STEP_FUNC_HANDLER
      };
    } else if (tk[TAG_TYPE] === "register-token-ids") {
      tk({ asyncTemplate: options.asyncTemplate });
      opCode = null;
    } else if (tk[TAG_TYPE] === "template" || Array.isArray(tk)) {
      const tt = tk[TAG_TYPE] === "template" ? tk : createTemplateTagsFromArray(tk);
      const template = new TagTemplate({ templateTags: tt, processor: this });
      this.applyTokenModuleLoad({ insertTokenIds: this._options.insertTokenIds }, template);
      opCode = {
        tk,
        template,
        code: STEP_SUB_TEMPLATE
      };
    } else if (tk.hasOwnProperty("str")) {
      // token is a literal string, just add it to output
      opCode = { tk, code: STEP_STR_TOKEN };
    } else if (typeof tk === "string") {
      opCode = { data: tk, code: STEP_LITERAL_HANDLER };
    } else if (!tk.isModule) {
      // token is not pointing to a module, so lookup from token handlers
      opCode = this.makeHandlerStep(tk);
    } else if (tk.custom === null) {
      if (insertTokenIds) {
        opCode = this.makeNullRemovedStep(tk, "process return null");
      } else {
        opCode = null;
      }
    } else {
      opCode = {
        tk,
        code: STEP_HANDLER,
        insertTokenId: options.insertTokenIds && !tk.props._noInsertId
      };
    }

    return opCode;
  }

  /**
   * Run rendering for a template
   * @param template - the template
   * @param context - RenderContext
   * @param tagTokens - template tag tokens
   *
   * @returns Promise that resolves after rendering completed
   */
  render(template: TagTemplate, context: RenderContext, tagTokens: any[]) {
    return executeTagTemplate(template, tagTokens, context);
  }
}
