/**
 * @packageDocumentation
 * @module @xarc/jsx-renderer
 */

/* eslint-disable max-statements, max-params, prefer-template, complexity */
/* eslint-disable filenames/match-regex */

import * as requireAt from "require-at";
import * as Path from "path";
import * as assert from "assert";
import * as _ from "lodash";
import {
  RenderContext,
  TokenModule,
  loadTokenModuleHandler,
  TOKEN_HANDLER
} from "@xarc/render-context";
import { omittedCloseTags, expandProps } from "./utils";
import { makeDefer, each } from "xaa";
import { xarcJsxElement } from "./symbols";

/**
 * The JSX renderer
 */
export class JsxRenderer {
  private _options: any;
  private _tokenHandlers: any;
  private _handlersMap: any;
  private _tokens: any;
  private _handlerContext: any;
  private _template: any;
  private _beforeRenders: any;
  private _afterRenders: any;
  private _handlersLookup: any;
  private _templateRequire: any;

  constructor(options: any) {
    this._options = options;

    this._tokenHandlers = [].concat(this._options.tokenHandlers).filter(x => x);
    this._handlersMap = {};
    this._tokens = {};
    // the same context that gets passed to each token handler's setup function
    this._handlerContext = _.merge(
      {
        user: {
          // set routeOptions in user also for consistency
          routeOptions: options.routeOptions
        }
      },
      options
    );
    this._template = options.template;
    this._templateRequire = requireAt(Path.resolve(this._options.templateFullPath || ""));
  }

  get insertTokenIds() {
    return this._options.insertTokenIds;
  }

  get templateFullPath() {
    return this._options.templateFullPath;
  }

  /**
   * render the JSX template
   * @param options
   * @returns RenderContext
   */
  async render(options) {
    const defer = makeDefer();
    const context = new RenderContext(options, this);

    try {
      await each(this._beforeRenders, (r: any) => r.beforeRender(context));
      await this._render(this._template, context, 0, defer);
      await defer.promise;
      const result = context.output.close();
      await each(this._afterRenders, (r: any) => r.afterRender(context));
      context.result = context.isVoidStop ? context.voidResult : result;
      return context;
    } catch (err) {
      context.result = err;
      return context;
    }
  }

  private _render(element, context, depth, defer?) {
    /* istanbul ignore next */
    const done = () => defer && defer.resolve();

    if (context.isFullStop || context.isVoidStop) {
      return done();
    }

    if (typeof element === "string") {
      context.output.add(`${element}\n`);
      return done();
    } else if (!element) {
      return done();
    }

    let close;

    const handleClose = () => {
      if (close) {
        context.output.add(`${close}\n`);
      } else {
        context.output.add(`\n`);
      }

      return defer && defer.resolve();
    };

    const handleElementChildren = () => {
      if (!element.children) {
        return handleClose();
      }

      let ix = 0;

      const nextChild = () => {
        if (ix >= element.children.length) {
          return handleClose();
        } else {
          const child = element.children[ix++];

          try {
            const promise = this._render(child, context, depth);
            if (promise) {
              return promise.then(nextChild);
            } else {
              return nextChild();
            }
          } catch (err) {
            if (defer) return defer.reject(err);

            throw err;
          }
        }
      };

      const promise = nextChild();

      return !defer && promise;
    };

    const handleElementResult = rendered => {
      if (!rendered) {
        return handleClose();
      }

      if (typeof rendered === "string") {
        context.output.add(rendered);
        return handleClose();
      } else if (rendered.then) {
        return rendered
          .then(asyncRendered => {
            return this._render(asyncRendered, context, depth + 1);
          })
          .then(handleClose)
          .catch(err => {
            context.handleError(err);
          });
      } else {
        // TODO: is try/catch needed for this block?  Need test case.
        const promise = this._render(rendered, context, depth + 1);
        if (promise) {
          return promise
            .then(asyncRendered => {
              return this._render(asyncRendered, context, depth + 1);
            })
            .then(handleClose);
        } else {
          return handleClose();
        }
      }
    };

    assert(
      element.$$typeof === xarcJsxElement,
      "Invalid xarc jsx element. Please make sure the JSX pragma /* @jsx createElement */ is added in the template file"
    );

    if (element.memoize) {
      context.output.add(`${element.memoize}\n`);
    } else if (element.tag) {
      if (!omittedCloseTags[element.tag]) {
        close = `</${element.tag}>`;
        context.output.add(`<${element.tag}${expandProps(element.props, context)}>`);
      } else {
        context.output.add(`<${element.tag}${expandProps(element.props, context)}/>`);
      }
    } else if (!element.type) {
        return handleElementResult(
          element(element.props, context, { element, depth, output: context.output })
        );
    } else if (element.Construct) {
      const inst = new element.Construct(element.props, context);
      return handleElementResult(
        inst.render(element.props, context, { depth, output: context.output })
      );
    } else {
      const r = element.type(element.props, context, { element, depth, output: context.output });
      return handleElementResult(r);
    }

    return handleElementChildren();
  }

  initializeRenderer(reset = false) {
    if (reset || !this._handlersLookup) {
      this._initializeTokenHandlers(this._tokenHandlers);
      this._handlersLookup = this._tokenHandlers.reverse();
    }
  }

  registerTokenHandler(name, handlerMod, call) {
    let mod = handlerMod;
    const isStr = typeof mod === "string";
    if (isStr && !name) {
      name = this._templateRequire.resolve(mod);
    }

    const id = name + (call || "");
    if (this._handlersMap[id]) {
      return;
    }
    if (typeof mod === "string") {
      mod = loadTokenModuleHandler(mod, this.templateFullPath, call);
      mod = (call && mod[call]) || mod;
    }
    let handler = mod(this._handlerContext, this);
    if (!handler.tokens) {
      handler = { name, tokens: handler };
    }
    this._handlersMap[id] = handler;
    this._handlersLookup = [handler].concat(this._handlersLookup);
  }

  private _loadTokenHandler(path) {
    const mod = loadTokenModuleHandler(path, this.templateFullPath);
    return mod(this._handlerContext, this);
  }

  private _applyTokenLoad(element, inst) {
    inst.load(this._options);

    if (inst[TOKEN_HANDLER]) return;

    const handler = this._handlersLookup.find(h => h.tokens.hasOwnProperty(inst.id));
    if (!handler) return;

    const tkFunc = handler.tokens[inst.id];
    if (typeof tkFunc === "function") {
      inst.setHandler(tkFunc);
    } else {
      element.memoize = tkFunc;
    }
  }

  setupTokenInst(element, scope, forRequire) {
    let tokenInst;
    let memId;

    if (scope.depth < 1) {
      memId = `${element.props._id}_${element.id}`;
      tokenInst = this._tokens[memId];

      if (tokenInst) {
        return tokenInst;
      }
    }

    const id = forRequire ? `require(${element.props._id})` : element.props._id;

    tokenInst = new TokenModule(id, 0, element.props, this.templateFullPath);

    if (memId) {
      this._tokens[memId] = tokenInst;
    }

    this._applyTokenLoad(element, tokenInst);

    return tokenInst;
  }

  getTokenInst(element) {
    return this._tokens[element.props._id];
  }

  private _initializeTokenHandlers(filenames) {
    this._tokenHandlers = filenames.map(fname => {
      let handler;
      if (typeof fname === "string") {
        handler = this._loadTokenHandler(fname);
      } else {
        handler = fname;
        assert(handler.name, "@xarc/jsx-renderer: Template token handler missing name");
      }
      if (!handler.name) {
        handler = {
          name: fname,
          tokens: handler
        };
      }
      assert(handler.tokens, "@xarc/jsx-renderer: Template token handler missing tokens");
      this._handlersMap[handler.name] = handler;
      return handler;
    });

    this._beforeRenders = this._tokenHandlers.filter(x => x.beforeRender);
    this._afterRenders = this._tokenHandlers.filter(x => x.afterRender);
  }
}
