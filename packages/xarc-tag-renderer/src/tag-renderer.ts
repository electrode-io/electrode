/* eslint-disable max-params, max-statements, no-constant-condition, no-magic-numbers */

import { TEMPLATE_DIR, RenderContext } from "@xarc/render-context";

import * as _ from "lodash";
import { RenderProcessor } from "./render-processor";
import { TagTemplate } from "./tag-template";

/**
 * TagRenderer
 *
 * A simple renderer for template from ES6 template literals
 *
 */
export class TagRenderer {
  /*
   * Yes, I know, everything any - I just want this to compile for now.
   */
  _options: any;
  _tokenHandlers: any[];
  _handlerContext: any;
  _handlersMap: {};
  _tokenIdLookupMap: {};
  _renderer: any;
  _tokens: any[];
  _templateDir: string;
  _template: TagTemplate;

  constructor(options: {
    template: TagTemplate;
    tokenHandlers?: Function | Function[];
    routeOptions?: any;
    insertTokenIds?: boolean;
  }) {
    this._options = options;
    this._template = options.template;
    this[TEMPLATE_DIR] = this._template._templateDir;
    this._tokens = this._template._templateTags;

    this._tokenHandlers = []
      .concat(this._options.tokenHandlers, this._template._tokenHandlers)
      .filter(x => x)
      .map(handler => ({ handler }));
    this._handlersMap = {};
    this._tokenIdLookupMap = {};

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
  }

  initializeRenderer(reset = !this._renderer) {
    if (reset) {
      this._initializeTokenHandlers(this._tokenHandlers);
      this._applyTokenLoad(this._options);
      this._renderer = new RenderProcessor({
        asyncTemplate: this,
        insertTokenIds: this._options.insertTokenIds,
        htmlTokens: this._tokens,
        tokenHandlers: this._tokenHandlers
      });
    }
  }

  lookupTokenHandler(tk) {
    return this._tokenIdLookupMap[tk.id];
  }

  async render(options) {
    let context;
    try {
      context = new RenderContext(options, this);
      const result = await this._renderer.render(context);
      context.result = context.isVoidStop ? context.voidResult : result;
      return context;
    } catch (err) {
      context.result = err;
      context.error = err;
      return context;
    }
  }

  registerTokenIds(name: string, uniqSym: symbol, handler: Function) {
    if (this._handlersMap.hasOwnProperty(uniqSym)) {
      return;
    }
    this._handlersMap[uniqSym] = handler;
    // remove same handler that's been registered so it goes to the end of the array
    this._tokenHandlers = this._tokenHandlers.filter(h => h.handler !== handler);
    this._tokenHandlers.push({ name, handler });
    this._initializeTokenHandlers(this._tokenHandlers);
  }

  _applyTokenLoad(options) {
    this._tokens.forEach(tokenModule => {
      if (tokenModule.load) {
        tokenModule.load(options);
      }
    });
  }

  _initializeTokenHandlers(handlers) {
    const tokenIds = handlers.map((h, ix) => {
      if (h.loaded) {
        return h.loaded.tokens;
      }

      const tokens = h.handler(this._handlerContext, this);

      h.loaded = tokens.tokens && typeof tokens.tokens === "object" ? { ...tokens } : { tokens };

      if (!h.loaded.name) {
        h.loaded.name = h.name || `unnamed-token-id-handler-${ix}`;
      }

      return h.loaded.tokens;
    });

    // combine all token IDs into a single object for lookup.
    // the last registered handler wins
    this._tokenIdLookupMap = Object.assign({}, ...tokenIds);
  }
}
