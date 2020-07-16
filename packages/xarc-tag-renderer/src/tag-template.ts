/* eslint-disable max-params */

import { TAG_TYPE } from "./symbols";
import { TokenModule } from "@xarc/render-context";

/**
 * Create a simple tag template from ES6 template literal strings
 *
 * Usage:
 *
 * ```js
 * import { TagTemplate, RegisterTokenIds, createTemplateTags, Token, TokenInvoke } from "@xarc/tag-renderer";
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
 * const templateTags = createTemplateTags`<!DOCTYPE html>
 * ${RegisterTokenIds(myTokenIdRegister)}
 * <html>${Token("INITIALIZE", {})}
 * <head>
 * ${TokenInvoke(myTokenHandler, {})}
 * ${subTemplate}
 *
 * </head>
 * <body>${TokenInvoke(myHtmlRenderHandler, {})}</body>
 * </html>
 * `
 *
 * export const template = TagTemplate({
 *  templateTags, templateDir: __dirname
 * })
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

export const RegisterTokenIds = (handler: Function, name?: string) => {
  const uniqSym = Symbol("register-token-${name}");
  const register = context => {
    context.asyncTemplate.registerTokenIds(name, uniqSym, handler);
  };
  register[TAG_TYPE] = "register-token-ids";
  return register;
};

export class TagTemplate {
  _templateTags: any[];
  _templateDir: string;
  _tokenHandlers: Function[];

  constructor(options: {
    templateTags: any[];
    templateDir?: string;
    tokenHandlers?: Function | Function[];
  }) {
    this._templateTags = options.templateTags.map((tag, ix) => {
      if (tag.hasOwnProperty(TAG_TYPE)) {
        tag.pos = ix;
      } else if (typeof tag === "function") {
        return { [TAG_TYPE]: "function", pos: ix, func: tag };
      }
      return tag;
    });
    this._templateDir = options.templateDir;
    this._tokenHandlers = [].concat(options.tokenHandlers);
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
      if (token.id === id) {
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
