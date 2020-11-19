/* eslint-disable max-params */

import { TAG_TYPE } from "./symbols";
import { TokenModule } from "@xarc/render-context";
import { RenderProcessor } from "./render-processor";

/**
 * Create a simple tag template from ES6 template literal strings
 *
 * Usage:
 *
 * ```js
 * import { RegisterTokenIds, createTemplateTags, Token, TokenInvoke } from "@xarc/tag-renderer";
 * import { myTokenHandler } from "./my-token-handler";
 * import { myHtmlRenderHandler } from "./my-html-render-handler";
 * import { myTokenIdRegister } from "./my-token-id-handler"
 *
 * const subTemplate = createTemplateTags`${(context: any) => {
 *   const { query } = context.options.request;
 *   if (query.userName) {
 *     return `hello there ${query.userName}`;
 *   }
 * }}`;
 *
 * export const templateTags = createTemplateTags`<!DOCTYPE html>
 * ${RegisterTokenIds(myTokenIdRegister)}
 * <html>${Token("INITIALIZE", {})}
 * <head>
 * ${TokenInvoke(myTokenHandler, {})}
 * ${subTemplate}
 * ${() => subTemplate}
 * ${() => Promise.resolve(subTemplate)}
 * </head>
 * <body>${TokenInvoke(myHtmlRenderHandler, {})}</body>
 * </html>
 * `
 * ```
 *
 * @param literals - string array
 * @param args - template literal tag arguments
 *
 * @return tag template
 */
export const createTemplateTags = (literals: TemplateStringsArray, ...args: any[]) => {
  const combined = [];

  for (let i = 0; i < args.length; i++) {
    const str = literals[i].trim();
    if (str) {
      combined.push({ str });
    }
    combined.push(args[i]);
  }

  combined.push({ str: literals[args.length] });

  combined[TAG_TYPE] = "template";

  return combined;
};

/**
 * Create a template tags array from a plain array of tags
 *
 * @param tags - array of tags
 * @returns tat template
 */
export const createTemplateTagsFromArray = (tags: any[]) => {
  const combined = [].concat(tags);
  combined[TAG_TYPE] = "template";
  return combined;
};

/**
 * Create a tag to invoke a token by its ID
 *
 * @param id - id of token
 * @param props - props
 *
 * @returns tag that's a token
 */
export const Token = (id: string | Function, props = {}) => {
  const tm = new TokenModule(id, -1, props, process.cwd());

  tm[TAG_TYPE] = "token";
  return tm;
};

/**
 * Create a tag to invoke a token module as a function
 *
 * @param handler - handler function of the token
 * @param props - props
 *
 * @returns tag that's a token module invoker
 */
export const TokenInvoke = (handler: Function, props = {}) => {
  const tm = new TokenModule("#tokenInvoke", -1, props, process.cwd());
  tm.tokenMod = handler;
  tm[TAG_TYPE] = "token";
  return tm;
};

/**
 * Register a handler to provide token IDs that can be used in the template
 *
 * Example:
 *
 * ```js
 * import { RegisterTokenIds, createTemplateTags } from "@xarc/tag-renderer";
 *
 * const templateTags = createTemplateTags`
 * ${RegisterTokenIds(() => {
 *   return {
 *     ID1: context => { }
 *   }
 * })}
 * ```
 *
 * @param handler - handler function
 * @param name - name to identify this handler
 * @returns a register function
 */
export const RegisterTokenIds = (handler: Function, name?: string) => {
  const uniqSym = Symbol("register-token-${name}");
  const register = context => {
    context.asyncTemplate.registerTokenIds(name, uniqSym, handler);
  };
  register[TAG_TYPE] = "register-token-ids";
  return register;
};

/**
 * Holds supporting and execution information and data for a template of tags
 */
export class TagTemplate {
  _templateTags: any[];
  _tagOpCodes: any[];
  _templateDir: string;
  _tokenHandlers: Function[];
  _processor: RenderProcessor;

  constructor(options: {
    /** template tags */
    templateTags: any[];
    /** directory where the template file resides */
    templateDir?: string;
    /** initial token handlers */
    tokenHandlers?: Function | Function[];
    /** template tag processor for generating rendering steps */
    processor: RenderProcessor;
  }) {
    this._templateTags = options.templateTags.map((tag, ix) => {
      if (tag && tag.hasOwnProperty(TAG_TYPE)) {
        tag.pos = ix;
      } else if (typeof tag === "function") {
        return { [TAG_TYPE]: "function", pos: ix, func: tag };
      }
      return tag;
    });

    this._tagOpCodes = new Array(this._templateTags.length);
    this._templateDir = options.templateDir;
    this._tokenHandlers = [].concat(options.tokenHandlers);
    this._processor = options.processor;
  }

  /**
   * Returns a template tag
   * @param index - index of the tag in the template tags array
   * @returns template tag
   */
  getTag(index: number) {
    return this._templateTags[index];
  }

  /**
   * Get a execution step opcode for the template tag at index
   * @param index - index of the tag in the template tags array
   * @returns template tag exec step opcode
   */
  getTagOpCode(index: number) {
    if (this._tagOpCodes[index] === undefined) {
      this._tagOpCodes[index] = this._processor.makeStep(this.getTag(index));
    }

    return this._tagOpCodes[index];
  }

  /**
   * Pre-initialize execution step opcode for the template tags
   */
  initTagOpCode() {
    for (let ix = 0; ix < this._templateTags.length; ix++) {
      this.getTagOpCode(ix);
    }
  }

  /**
   * Handle a sub template returned by executing a step
   * @param step - the step that was executed
   * @param templateTags - the template tags returned
   *
   * @returns new step for executing the sub template tags
   */

  handleSubTemplate(step: any, templateTags: any[]) {
    return (
      step._subTemplateStep || (step._subTemplateStep = this._processor.makeStep(templateTags))
    );
  }

  _findTokenIndex(
    id = "",
    str: string | RegExp = "",
    index = 0,
    instance = 0,
    msg = "TagRenderer._findTokenIndex"
  ) {
    let found;

    if (id) {
      found = this.findTokensById(id, instance + 1);
    } else if (str) {
      found = this.findTokensByStr(str, instance + 1);
    } else if (!Number.isInteger(index)) {
      throw new Error(`${msg}: invalid id, str, and index`);
    } else if (index < 0 || index >= this._templateTags.length) {
      throw new Error(`${msg}: index ${index} is out of range.`);
    } else {
      return index;
    }

    if (found.length === 0) return false;

    return found[instance].index;
  }

  findTokensById(id, count = Infinity) {
    if (!Number.isInteger(count)) count = this._templateTags.length;

    const found = [];

    for (let index = 0; index < this._templateTags.length && found.length < count; index++) {
      const token = this._templateTags[index];
      if (token?.id === id) {
        found.push({ index, token });
      }
    }

    return found;
  }

  /**
   * Find a literal token in the template by matching its str
   *
   * @param matcher - a string or a RegExp to match token's str
   * @param count
   */
  findTokensByStr(matcher, count = Infinity) {
    if (!Number.isInteger(count)) {
      count = this._templateTags.length;
    }

    const found = [];

    let match;

    if (typeof matcher === "string") {
      match = str => str.indexOf(matcher) >= 0;
    } else if (matcher && matcher.constructor.name === "RegExp") {
      match = str => str.match(matcher);
    } else {
      throw new Error("TagRenderer.findTokensByStr: matcher must be a string or RegExp");
    }

    for (let index = 0; index < this._templateTags.length && found.length < count; index++) {
      const token = this._templateTags[index];
      if (token.hasOwnProperty("str") && match(token.str)) {
        found.push({ index, token });
      }
    }

    return found;
  }
}
