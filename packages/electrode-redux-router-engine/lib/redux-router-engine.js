"use strict";

/* eslint-disable  max-statements, prefer-spread, global-require, complexity */

const Path = require("path");
const assert = require("assert");
const Url = require("url");
const optionalRequire = require("optional-require")(require);
const React = optionalRequire("react");
const ReactDomServer = optionalRequire("react-dom/server");
const Provider = require("react-redux").Provider;
const { StaticRouter } = require("react-router-dom");
const { matchRoutes, renderRoutes } = require("react-router-config");
const { combineReducers, createStore } = require("redux");
const pkg = require("../package.json");
const util = require("./util");
const ServerContext = require("./server-context");

const BAD_CHARS_REGEXP = /[<\u2028\u2029]/g;
const REPLACEMENTS_FOR_BAD_CHARS = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};

function escapeBadChars(sourceString) {
  return sourceString.replace(BAD_CHARS_REGEXP, match => REPLACEMENTS_FOR_BAD_CHARS[match]);
}

const ROUTE_HANDLER = Symbol("route handler");

class ReduxRouterEngine {
  constructor(options) {
    assert(options.routes, "Must provide react-router routes for redux-router-engine");

    this.options = Object.assign({ webappPrefix: "", basename: "" }, options);
    this.options.withIds = Boolean(options.withIds);

    // generate __PRELOADED_STATE__ or __<prefix>_PRELOADED_STATE__
    const preloadedStateName = ["_", this.options.webappPrefix, "PRELOADED_STATE__"]
      .filter(x => x)
      .join("_");

    if (!options.stringifyPreloadedState) {
      this.options.stringifyPreloadedState = state =>
        `window.${preloadedStateName} = ${escapeBadChars(JSON.stringify(state))};`;
    }

    if (!this.options.logError) {
      this.options.logError = (req, err) => console.log(`${pkg.name} Error:`, err); //eslint-disable-line
    }

    if (this.options.renderToString) {
      this._renderToString = this.options.renderToString;
    }

    // if options.routes is a string, then treat it as a path to the routes source for require
    if (typeof options.routes === "string") {
      const x = util.resolveModulePath(options.routes);
      this._routes = util.es6Default(require(x));
    } else {
      this._routes = options.routes;
    }

    this._routesDir = options.routesHandlerPath
      ? Path.resolve(options.routesHandlerPath)
      : Path.resolve(process.env.APP_SRC_DIR || "", "server/routes");

    this._routesComponent = renderRoutes(this._routes);
  }

  startMatch(req, options = {}) {
    const location = options.location || Url.parse(req.url || req.path);

    options = Object.assign({}, options, { req, location });

    options.match = this._matchRoute(req, this._routes, location);

    return options;
  }

  checkMatch(options) {
    const location = options.location;
    const match = options.match;

    if (match.length === 0) {
      return {
        status: 404,
        message: `${pkg.name}: Path ${location.path} not found`
      };
    }

    const methods = match[0].route.methods || "get";

    if (methods.toLowerCase().indexOf(options.req.method.toLowerCase()) < 0) {
      throw new Error(
        `${pkg.name}: ${location.path} doesn't allow request method ${options.req.method}`
      );
    }

    return undefined;
  }

  async render(req, options) {
    try {
      options = this.startMatch(req, options);
      const earlyOut = this.checkMatch(options);
      if (earlyOut) return earlyOut;
      await this.prepReduxStore(options);

      return await this._handleRender(options);
    } catch (err) {
      this.options.logError.call(this, req, err);
      return {
        status: err.status || 500, // eslint-disable-line
        message: err.message,
        path: err.path || options.location.path,
        _err: err
      };
    }
  }

  //
  _matchRoute(req, routes, location) {
    let pathname = location.pathname;

    if (this.options.basename) {
      if (!pathname.startsWith(this.options.basename)) {
        // route has a basename, but path doesn't start with basename
        return [];
      } else {
        pathname = pathname.replace(this.options.basename, "");
      }
    }

    return matchRoutes(routes, pathname);
  }

  async prepReduxStore(options) {
    options.withIds = options.withIds !== undefined ? options.withIds : this.options.withIds;

    const inits = [];

    const match = options.match;

    for (let ri = 1; ri < match.length; ri++) {
      const route = match[ri].route;
      const init = this._getRouteInit(route);
      if (init) {
        inits.push(
          init({
            req: options.req,
            location: options.location,
            match: options.match,
            route,
            inits
          })
        );
      }
    }

    let awaited = false;

    const awaitInits = async () => {
      if (awaited) return;
      awaited = true;
      for (let x = 0; x < inits.length; x++) {
        if (inits[x].then) inits[x] = await inits[x];
      }
    };

    let topInit = this._getRouteInit(match[0].route);
    if (topInit) {
      topInit = topInit({
        req: options.req,
        location: options.location,
        match,
        route: match[0].route,
        inits,
        awaitInits
      });
    }

    if (topInit.then) {
      await awaitInits();
      topInit = await topInit;
    }

    if (topInit.store) {
      // top route provided a ready made store, just use it
      options.store = topInit.store;
    } else {
      if (!awaited) await awaitInits();

      let reducer;
      let initialState;

      if (topInit.initialState || inits.length > 0) {
        initialState = Object.assign.apply(
          null,
          [{}, topInit.initialState].concat(inits.map(x => x.initialState))
        );
      } else {
        // no route provided any initialState
        initialState = {};
      }

      if (typeof topInit.reducer === "function") {
        // top route provided a ready made reducer
        reducer = topInit.reducer;
      } else if (topInit.reducer || inits.length > 0) {
        // top route only provide its own reducer and initialState
        const allReducers = Object.assign.apply(
          null,
          [{}, topInit.reducer].concat(inits.map(x => x.reducer))
        );

        reducer = combineReducers(allReducers);
      } else {
        // no route provided any reducer
        reducer = x => x;
      }

      options.store = createStore(reducer, initialState);
    }

    return options.store;
  }

  async _handleRender(options) {
    const routeContext = (options.routeContext = {});
    const stringifyPreloadedState =
      options.stringifyPreloadedState || this.options.stringifyPreloadedState;

    let html = this._renderToString(options);

    if (html.then !== undefined) {
      // a Promise?
      html = await html;
    }

    if (this.options.componentRedirect && routeContext.action === "REPLACE") {
      return { status: 302, html, path: routeContext.url, store: options.store };
    } else {
      return { status: 200, html, prefetch: stringifyPreloadedState(options.store.getState()) };
    }
  }

  _renderToString({ req, location, store, routeContext, withIds }) {
    if (req.app && req.app.disableSSR) {
      return "<!-- SSR disabled by request -->";
    } else {
      assert(React, `${pkg.name}: can't do SSR because react not found`);
      assert(ReactDomServer, `${pkg.name}: can't do SSR because react-dom not found`);
      return (withIds ? ReactDomServer.renderToString : ReactDomServer.renderToStaticMarkup)(
        React.createElement(
          // server side context to provide request
          ServerContext,
          { request: req },
          // redux provider
          React.createElement(
            Provider,
            { store },
            // user route component
            React.createElement(
              StaticRouter,
              { location, context: routeContext, basename: this.options.basename },
              this._routesComponent
            )
          )
        )
      );
    }
  }

  _getRouteInit(route) {
    let h = route[ROUTE_HANDLER];

    if (h !== undefined) return h;

    if (!route.init) {
      h = false;
    } else if (route.init === true) {
      h = Path.join(this._routesDir, route.path);
    } else {
      assert(typeof route.init === "string", `${pkg.name}: route init prop must be a string`);
      h = util.resolveModulePath(route.init, this._routesDir);
    }

    if (h) {
      h = util.es6Default(require(h));
    }

    route[ROUTE_HANDLER] = h;

    return h;
  }
}

module.exports = ReduxRouterEngine;
