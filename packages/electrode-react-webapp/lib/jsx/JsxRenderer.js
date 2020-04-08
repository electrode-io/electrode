"use strict";

/* eslint-disable max-statements, max-params, prefer-template, complexity */

const assert = require("assert");
const _ = require("lodash");
const loadHandler = require("../load-handler");
const RenderContext = require("../render-context");
const { omittedCloseTags, expandProps } = require("./utils");
const Token = require("../token");
const Promise = require("bluebird");
const { TOKEN_HANDLER } = require("../symbols");

const createDefer = () => {
  const defer = {};
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

class JsxRenderer {
  constructor(options) {
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
  }

  get insertTokenIds() {
    return this._options.insertTokenIds;
  }

  get templateFullPath() {
    return this._options.templateFullPath;
  }

  render(options) {
    const defer = createDefer();
    const context = new RenderContext(options, this);

    return Promise.each(this._beforeRenders, r => r.beforeRender(context))
      .then(() => {
        return this._render(this._template, context, 0, defer);
      })
      .then(() => {
        return defer.promise
          .then(() => context.output.close())
          .then(result => {
            /* istanbul ignore next */
            return Promise.each(this._afterRenders, r => r.afterRender(context)).then(() => {
              context.result = context.isVoidStop ? context.voidResult : result;

              return context;
            });
          });
      })
      .catch(err => {
        context.result = err;
        return context;
      });
  }

  _render(element, context, depth, defer) {
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

  initializeRenderer(reset) {
    if (reset || !this._handlersLookup) {
      this._initializeTokenHandlers(this._tokenHandlers);
      this._handlersLookup = this._tokenHandlers.reverse();
    }
  }

  _loadTokenHandler(path) {
    const mod = loadHandler(path);
    return mod(this._handlerContext, this);
  }

  _applyTokenLoad(element, inst) {
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

    tokenInst = new Token(id, 0, element.props, this.templateFullPath);

    if (memId) {
      this._tokens[memId] = tokenInst;
    }

    this._applyTokenLoad(element, tokenInst);

    return tokenInst;
  }

  getTokenInst(element) {
    return this._tokens[element.props._id];
  }

  _initializeTokenHandlers(filenames) {
    this._tokenHandlers = filenames.map(fname => {
      let handler;
      if (typeof fname === "string") {
        handler = this._loadTokenHandler(fname);
      } else {
        handler = fname;
        assert(handler.name, "electrode-react-webapp Template token handler missing name");
      }
      if (!handler.name) {
        handler = {
          name: fname,
          tokens: handler
        };
      }
      assert(handler.tokens, "electrode-react-webapp Template token handler missing tokens");
      this._handlersMap[handler.name] = handler;
      return handler;
    });

    this._beforeRenders = this._tokenHandlers.filter(x => x.beforeRender);
    this._afterRenders = this._tokenHandlers.filter(x => x.afterRender);
  }
}

module.exports = JsxRenderer;
