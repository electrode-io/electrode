/* eslint-disable max-params, max-statements, no-constant-condition, no-magic-numbers */

import { RenderContext } from "@xarc/render-context";

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
  _processor: RenderProcessor;
  _tokens: any[];
  _template: TagTemplate;

  constructor(options: {
    templateTags: any[];
    tokenHandlers?: Function | Function[];
    routeOptions?: any;
    insertTokenIds?: boolean;
  }) {
    this._options = options;
    this._tokens = options.templateTags;

    this._tokenHandlers = [];
    []
      .concat(this._options.tokenHandlers)
      .filter(x => x)
      .forEach(handler => this.addTokenIds("", handler));

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

  /**
   * Initialize to get ready to do rendering
   * @param reset - if true, will run even if already initialized
   */
  initializeRenderer(reset = !this._processor) {
    if (reset) {
      this._initializeTokenHandlers(this._tokenHandlers);
      this._applyTokenLoad(this._options);
      this._processor = new RenderProcessor({
        asyncTemplate: this,
        insertTokenIds: this._options.insertTokenIds
      });

      this._template = new TagTemplate({
        templateTags: this._tokens,
        processor: this._processor
      });

      this._template.initTagOpCode();
    }
  }

  /**
   * Lookup the handler of a tag
   * @param tk - tag
   */
  lookupTokenHandler(tk) {
    return this._tokenIdLookupMap[tk.id];
  }

  /**
   * Render the template
   * @param options - render context options
   *
   * @returns render context
   */
  async render(options) {
    let context;
    try {
      context = new RenderContext(options, this);
      const result = await this._processor.render(this._template, context, this._tokens);
      context.result = context.isVoidStop ? context.voidResult : result;
      return context;
    } catch (err) {
      context.result = err;
      context.error = err;
      return context;
    }
  }

  /**
   * Add a handler to provide token IDs for the template but will not invoke it yet
   *
   * @param name - name of token ids
   * @param handler - handler function
   * @param priority - higher value === higher priority
   */
  addTokenIds(name: string, handler: Function, priority = 0) {
    // remove same handler that's been registered so it goes to the end of the array
    this._tokenHandlers = this._tokenHandlers.filter(h => h.handler !== handler);
    this._tokenHandlers.push({ name, handler, priority });
  }

  /**
   * Register a handler to provide token IDs for the template
   *
   * @param name - name of token ids
   * @param uniqSym - unique symbol identifier
   * @param handler - handler function
   * @param priority - higher value === higher priority
   */
  registerTokenIds(name: string, uniqSym: symbol, handler: Function, priority = 0) {
    if (this._handlersMap.hasOwnProperty(uniqSym)) {
      return;
    }
    this._handlersMap[uniqSym] = handler;
    this.addTokenIds(name, handler, priority);
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
    const loaded = handlers.map((h, ix) => {
      if (h.loaded) {
        return h.loaded;
      }

      const tokens = h.handler(this._handlerContext, this);

      h.loaded =
        tokens.tokens && typeof tokens.tokens === "object"
          ? { ...tokens, priority: h.priority }
          : { tokens, priority: h.priority };

      if (!h.loaded.name) {
        h.loaded.name = h.name || `unnamed-token-id-handler-${ix}`;
      }

      return h.loaded;
    });

    const tokenIds = loaded.sort((a, b) => a.priority - b.priority).map(l => l.tokens);

    // combine all token IDs into a single object for lookup.
    // the last registered handler wins
    this._tokenIdLookupMap = Object.assign({}, ...tokenIds);
  }
}
